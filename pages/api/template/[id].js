import nc from 'next-connect';

import { dbConnect, filterObject } from 'utils';
import Template from 'models/templateModel';
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

// Update Template
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(req.body, 'title', 'status', 'frame');

  // Update Template in MongoDB
  const template = await Template.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!template) {
    throw new Error('Template not found.');
  }

  return res.status(200).json({
    success: true,
    data: {
      template,
    },
  });
});

handler.delete(async (req, res, next) => {
  const { id } = req.query;

  // Delete template in MongoDB
  const template = await Template.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!template) {
    throw new Error('Template not found.');
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
