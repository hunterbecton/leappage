import nc from 'next-connect';
import mongoose from 'mongoose';

import { dbConnect, filterObject } from 'utils';
import Content from 'models/contentModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';

dbConnect();

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

// Update Content
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'title',
    'url',
    'description',
    'feature',
    'category',
    'status'
  );

  // Remove category if not valid Mongoose Object ID
  if (!mongoose.isValidObjectId(filteredBody.category)) {
    delete filteredBody.category;
  }

  // Update Content in MongoDB
  const content = await Content.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!content) {
    throw new Error('Content not found.');
  }

  return res.status(200).json({
    success: true,
    data: {
      content,
    },
  });
});

handler.delete(async (req, res, next) => {
  const { id } = req.query;

  // Delete Content in MongoDB
  const content = await Content.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!content) {
    throw new Error('Content not found.');
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
