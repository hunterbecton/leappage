import { dbConnect } from 'utils';
import Media from 'models/mediaModel';

dbConnect();

export const withMedias = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id };

    const totalMedia = await Media.countDocuments(filter);

    const medias = await Media.find({
      tenant: ctx.req.user.tenant_mongo_id,
    })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalMedia, medias });
  } catch (error) {
    console.log(error);
    return false;
  }
};
