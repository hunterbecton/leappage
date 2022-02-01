import { dbConnect } from 'utils';
import Media from 'models/mediaModel';

dbConnect();

export const withMedia = async (ctx) => {
  try {
    const { id } = ctx.params;

    const media = await Media.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
    });

    if (!media) {
      return false;
    }

    return JSON.stringify(media);
  } catch (error) {
    console.log(error);
    return false;
  }
};
