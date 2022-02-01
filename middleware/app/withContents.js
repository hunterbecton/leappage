import { dbConnect } from 'utils';
import Content from 'models/contentModel';

dbConnect();

export const withContents = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id };

    const totalContents = await Content.countDocuments(filter);

    const contents = await Content.find({
      tenant: ctx.req.user.tenant_mongo_id,
    })
      .populate({
        path: 'categoryInfo',
        select: 'title',
      })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalContents, contents });
  } catch (error) {
    console.log(error);
    return false;
  }
};
