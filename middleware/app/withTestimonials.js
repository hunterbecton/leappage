import { dbConnect } from 'utils';
import Testimonial from 'models/testimonialModel';

dbConnect();

export const withTestimonials = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id };

    const totalTestimonials = await Testimonial.countDocuments(filter);

    const testimonials = await Testimonial.find({
      tenant: ctx.req.user.tenant_mongo_id,
    })
      .populate({
        path: 'categoryInfo',
        select: 'title',
      })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalTestimonials, testimonials });
  } catch (error) {
    console.log(error);
    return false;
  }
};
