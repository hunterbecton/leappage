import nc from 'next-connect';
import multer from 'multer';
import sharp from 'sharp';
import mongoose from 'mongoose';
import Stripe from 'stripe';

import { dbConnect, filterObject, cloneObject, renameKey } from 'utils';
import User from 'models/userModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';
import storage from 'services/google';
import { firebaseAdmin } from 'services/firebaseAdmin';

dbConnect();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    throw new Error('Only upload JPG or PNG files.');
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // no larger than 2mb
  },
  fileFilter: multerFilter,
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: {
        message: err.message || 'Server Error',
      },
    });
  },
});

// Protect routes
handler.use(withProtect);

// Check subscription
handler.use(withSubscription);

// Restrict routes
handler.use(withRestrict('admin', 'editor'));

// Delete Teammate
handler.delete(async (req, res, next) => {
  const { id } = req.query;

  const ObjectId = mongoose.Types.ObjectId;

  // Get account admins
  const admins = await User.aggregate([
    {
      $project: {
        tenant: 1,
        role: 1,
        email: 1,
      },
    },
    {
      $match: {
        tenant: ObjectId(req.user.tenant_mongo_id),
        role: 'admin',
      },
    },
    {
      $group: {
        _id: {
          role: '$role',
        },
        total: { $sum: 1 },
      },
    },
  ]);

  // Ensure account has at least one admin
  if (admins[0].total <= 1) {
    // Check if user being deleted is admin
    const isAdmin = await User.findOne({ _id: id, role: 'admin' });

    // Throw error if only admin is trying to update
    // role to non admin
    if (isAdmin) {
      throw new Error('Each account needs at least one admin.');
    }
  }

  const tenantAuth = firebaseAdmin
    .auth()
    .tenantManager()
    .authForTenant(req.user.firebase.tenant);

  // Delete user in MongoDB
  const user = await User.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!user) {
    throw new Error('Teammate not found.');
  }

  // Delete user in Google
  await tenantAuth.deleteUser(id);

  // Update Stripe subscription
  await stripe.subscriptionItems.update(req.subscription.stripeSubItemId, {
    quantity: req.subscription.quantity - 1,
  });

  return res.status(200).json({
    success: true,
    data: {},
  });
});

// Use Multer middleware
handler.use(upload.single('file'));

// Update Teammate
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  const ObjectId = mongoose.Types.ObjectId;

  const tenantAuth = firebaseAdmin
    .auth()
    .tenantManager()
    .authForTenant(req.user.firebase.tenant);

  // Get items from req.body
  const filteredBody = filterObject(req.body, 'name', 'role');

  // Get account admins
  const admins = await User.aggregate([
    {
      $project: {
        tenant: 1,
        role: 1,
        email: 1,
      },
    },
    {
      $match: {
        tenant: ObjectId(req.user.tenant_mongo_id),
        role: 'admin',
      },
    },
    {
      $group: {
        _id: {
          role: '$role',
        },
        total: { $sum: 1 },
      },
    },
  ]);

  // Ensure account has at least one admin
  if (admins[0].total <= 1) {
    // Check if user being updated is admin
    const isAdmin = await User.findOne({ _id: id, role: 'admin' });

    // Throw error if only admin is trying to update
    // role to non admin
    if (isAdmin && filteredBody.role !== 'admin') {
      throw new Error('Each account needs at least one admin.');
    }
  }

  // Format body for Google Auth
  let googleFilteredBody = cloneObject(filteredBody);

  googleFilteredBody = renameKey(googleFilteredBody, 'name', 'displayName');

  if (req.file) {
    // Format image
    const formmatedImage = await sharp(req.file.buffer)
      .resize(100, 100)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toBuffer();

    let ext = req.file.mimetype.split('/')[1];
    // Upload preview file to Google
    const path = `${req.user.tenant_mongo_id}-${new Date().getTime()}`;
    const bucketName = 'ace-case-336816.appspot.com';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(
      `tenants/${req.user.firebase.tenant}/account/${path}.${ext}`
    );

    await file.save(formmatedImage);

    let publicFile = `https://storage.googleapis.com/${bucketName}/tenants/${req.user.firebase.tenant}/account/${path}_200x200.${ext}`;

    filteredBody.profileImage = publicFile;

    googleFilteredBody.photoURL = publicFile;
  }

  // Update user in Google
  await tenantAuth.updateUser(id, googleFilteredBody);

  // Update user claims in Google
  await tenantAuth.setCustomUserClaims(id, {
    role: filteredBody.role,
    tenant_mongo_id: req.user.tenant_mongo_id,
  });

  // Update user in MongoDB
  const user = await User.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
