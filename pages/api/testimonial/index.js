import nc from 'next-connect';

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

export default handler;
