import nc from 'next-connect';
import multer from 'multer';
import sharp from 'sharp';

import { dbConnect, filterObject, cloneObject, renameKey } from 'utils';
import User from 'models/userModel';
import { withProtect } from 'middleware/api/withProtect';
import { withSubscription } from 'middleware/api/withSubscription';
import storage from 'services/google';
import { firebaseAdmin } from 'services/firebaseAdmin';

dbConnect();

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
    res.status(500).end(err.toString());
  },
});

// Protect routes
handler.use(withProtect);

// Check subscription
handler.use(withSubscription);

// Use Multer middleware
handler.use(upload.single('file'));

// Update current user
handler.patch(async (req, res, next) => {
  const tenantAuth = firebaseAdmin
    .auth()
    .tenantManager()
    .authForTenant(req.user.firebase.tenant);

  // Get items from req.body
  const filteredBody = filterObject(req.body, 'name');

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

    await file.makePublic();

    let publicFile = `https://storage.googleapis.com/${bucketName}/tenants/${req.user.firebase.tenant}/account/${path}.${ext}`;

    filteredBody.profileImage = publicFile;

    googleFilteredBody.photoURL = publicFile;
  }

  // Update user in Google
  await tenantAuth.updateUser(req.user.uid, googleFilteredBody);

  // Update user in MongoDB
  const user = await User.findOneAndUpdate(
    {
      _id: req.user.uid,
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
