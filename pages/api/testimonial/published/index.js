import nc from 'next-connect';

import { dbConnect } from 'utils';
import Testimonial from 'models/testimonialModel';
import APIFeatures from 'utils/APIFeatures';

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    res.status(500).end(err.toString());
  },
});

// Get all published Testimonials
handler.get(async (req, res, next) => {
  let filter = { status: 'published' };

  const totalTestimonials = await Testimonial.countDocuments(filter);

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

  return res.status(200).json({
    success: true,
    data: {
      testimonials,
      totalTestimonials,
    },
  });
});

export default handler;
