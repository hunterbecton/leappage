import { dbConnect } from 'utils';
import Testimonial from 'models/testimonialModel';

dbConnect();

export const withTestimonial = async (ctx) => {
  try {
    const { id } = ctx.params;

    const testimonial = await Testimonial.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
    }).populate({
      path: 'categoryInfo',
      select: 'title',
    });

    if (!testimonial) {
      return false;
    }

    return JSON.stringify(testimonial);
  } catch (error) {
    console.log(error);
    return false;
  }
};
