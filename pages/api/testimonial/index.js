import nc from 'next-connect';

import { dbConnect, filterObject } from 'utils';
import Testimonial from 'models/testimonialModel';
import { withProtect } from 'middleware/api/withProtect';
import { withSubscription } from 'middleware/api/withSubscription';
import { withRestrict } from 'middleware/api/withRestrict';
import APIFeatures from 'utils/APIFeatures';

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

// Create Testimonial
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'title',
    'quote',
    'profileImage',
    'name',
    'company',
    'position',
    'category'
  );

  // Create Testimonial in MongoDB
  const testimonial = await Testimonial.create({
    ...filteredBody,
    tenant: req.user.tenant_mongo_id,
  });

  return res.status(200).json({
    success: true,
    data: {
      testimonial,
    },
  });
});

// Get testimonials
handler.get(async (req, res, next) => {
  let filter = { tenant: req.user.tenant_mongo_id };

  const features = new APIFeatures(
    Testimonial.find(filter).populate({
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

  const testimonials = await features.query;

  const count = new APIFeatures(
    Testimonial.find(filter).populate({
      path: 'categoryInfo',
      select: 'title',
    }),
    req.query,
    req.url
  )
    .filter()
    .sort()
    .limitFields()
    .count();

  const totalTestimonials = await count.query;

  return res.status(200).json({
    success: true,
    data: {
      testimonials,
      totalTestimonials,
    },
  });
});

export default handler;
