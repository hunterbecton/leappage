import nc from 'next-connect';

import { dbConnect, filterObject } from 'utils';
import Category from 'models/categoryModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';

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

// Update Category
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(req.body, 'title');

  // Update Category in MongoDB
  const category = await Category.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new Error('Category not found.');
  }

  return res.status(200).json({
    success: true,
    data: {
      category,
    },
  });
});

handler.delete(async (req, res, next) => {
  const { id } = req.query;

  // Delete Category in MongoDB
  const category = await Category.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!category) {
    throw new Error('Category not found.');
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
