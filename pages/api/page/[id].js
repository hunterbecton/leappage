import nc from 'next-connect';
import slugify from 'slugify';

import { dbConnect, filterObject } from 'utils';
import Page from 'models/pageModel';
import { withProtect } from 'middleware/api/withProtect';
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

// Get Page
handler.get(async (req, res, next) => {
  const { id } = req.query;

  const page = await Page.findOne({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!page) {
    throw new Error('Page not found.');
  }

  return res.status(200).json({
    success: true,
    data: {
      page,
    },
  });
});

// Update Page
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'title',
    'status',
    'slug',
    'frame'
  );

  // Format and check slug
  if (filteredBody.slug) {
    filteredBody.slug = slugify(filteredBody.slug, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check if tenant already has slug
    const pageWithSlug = await Page.findOne({
      tenant: req.user.tenant_mongo_id,
      slug: filteredBody.slug,
    });

    // Throw error if more than one page in use with slug
    if (pageWithSlug && pageWithSlug.id != id) {
      throw new Error('Slug already in use.');
    }
  }

  // Update Page in MongoDB
  const page = await Page.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
      user: req.user.uid,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!page) {
    throw new Error('Page not found.');
  }

  return res.status(200).json({
    success: true,
    data: {
      page,
    },
  });
});

handler.delete(async (req, res, next) => {
  const { id } = req.query;

  // Delete template in MongoDB
  const page = await Page.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
    user: req.user.uid,
  });

  if (!page) {
    throw new Error('Page not found.');
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
