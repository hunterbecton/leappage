import nc from 'next-connect';

import { dbConnect } from 'utils';
import Testimonial from 'models/testimonialModel';

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    res.status(500).end(err.toString());
  },
});

// Get published Testimonial
handler.get(async (req, res, next) => {
  const { id } = req.query;

  // Ignore demo / placeholder data
  if (id.startsWith('demo')) {
    return res.status(200).json({
      success: true,
      data: {
        testimonial: {
          id,
          title: 'Acme Inc. Testimonial',
          quote: `The personalized sales pages we were able to create with LeapPage have made a great first impression on our leads. We've landed more demos and increased sales.`,
          categoryInfo: [{ title: 'Resource' }],
          name: 'Collins Lancaster',
          position: 'Head of Sales',
          company: 'Acme Inc.',
          profileImage: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
        },
      },
    });
  }

  const testimonial = await Testimonial.findOne({
    _id: id,
    status: 'published',
  }).populate({
    path: 'categoryInfo',
    select: 'title',
  });

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

export default handler;
