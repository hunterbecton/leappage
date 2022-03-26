import nc from 'next-connect';

import { dbConnect, filterObject, checkValidMongoId } from 'utils';
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

handler.get(async (req, res, next) => {
  const { id } = req.query;

  let filteredQuery = filterObject(req.query, 'status');

  // Ignore demo / placeholder data
  if (id.startsWith('demo')) {
    return res.status(200).json({
      success: true,
      data: {
        content: {
          id,
          title: '4 Simple Tips for Leveraging the Power of Social Media',
          description:
            'The importance of customer reviews online for businesses can mean a surge in brand awareness and an overall increase in profit in the long run.',
          categoryInfo: [{ title: 'Resource' }],
          feature: 'https://dummyimage.com/672x512/f3f4f6/1f2937.jpg',
          url: '#',
        },
      },
    });
  }

  let filter = { tenant: req.user.tenant_mongo_id, _id: id, ...filteredQuery };

  const content = await Content.findOne(filter).populate({
    path: 'categoryInfo',
    select: 'title',
  });

  return res.status(200).json({
    success: true,
    data: {
      content,
    },
  });
});

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
  if (!checkValidMongoId(filteredBody.category)) {
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
