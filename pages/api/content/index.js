import nc from 'next-connect';

import { dbConnect, filterObject } from 'utils';
import Content from 'models/contentModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';
import APIFeatures from 'utils/APIFeatures';

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

// Get Content
handler.get(async (req, res, next) => {
  let filter = { tenant: req.user.tenant_mongo_id };

  const totalContent = await Content.countDocuments(filter);

  const features = new APIFeatures(
    Content.find(filter).populate({
      path: 'categoryInfo',
      select: 'title',
    }),
    req.query,
    req.url
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const content = await features.query;

  return res.status(200).json({
    success: true,
    data: {
      content,
      totalContent,
    },
  });
});

// Check subscription
handler.use(withSubscription);

// Restrict routes
handler.use(withRestrict('admin', 'editor'));

// Create Content
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'title',
    'url',
    'description',
    'feature',
    'category'
  );

  // Create Page in MongoDB
  const content = await Content.create({
    ...filteredBody,
    tenant: req.user.tenant_mongo_id,
  });

  return res.status(200).json({
    success: true,
    data: {
      content,
    },
  });
});

// Get Content
handler.get(async (req, res, next) => {
  let filter = { tenant: req.user.tenant_mongo_id };

  const features = new APIFeatures(
    Content.find(filter).populate({
      path: 'categoryInfo',
      select: 'title',
    }),
    req.query,
    req.url
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const content = await features.query;

  return res.status(200).json({
    success: true,
    data: {
      content,
      totalContent,
    },
  });
});

export default handler;
