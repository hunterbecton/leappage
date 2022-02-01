import nc from 'next-connect';
import mongoose from 'mongoose';

import { dbConnect, filterObject } from 'utils';
import Testimonial from 'models/testimonialModel';
import { withProtect } from 'middleware/api/withProtect';
import { withSubscription } from 'middleware/api/withSubscription';
import { withRestrict } from 'middleware/api/withRestrict';

dbConnect();

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

// Restrict routes
handler.use(withRestrict('admin', 'editor'));

// Update Testimonial
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'title',
    'quote',
    'profileImage',
    'name',
    'company',
    'position',
    'category',
    'status'
  );

  // Remove category if not valid Mongoose Object ID
  if (!mongoose.isValidObjectId(filteredBody.category)) {
    delete filteredBody.category;
  }

  // Update Testimonial in MongoDB
  const testimonial = await Testimonial.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!testimonial) {
    throw new Error('Testimonial not found.');
  }

  return res.status(200).json({
    success: true,
    data: {
      testimonial,
    },
  });
});

handler.delete(async (req, res, next) => {
  const { id } = req.query;

  // Delete Testimonial in MongoDB
  const testimonial = await Testimonial.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!testimonial) {
    throw new Error('Testimonial not found.');
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
