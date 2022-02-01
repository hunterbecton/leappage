import { dbConnect } from 'utils';
import Content from 'models/contentModel';

dbConnect();

export const withContent = async (ctx) => {
  try {
    const { id } = ctx.params;

    const content = await Content.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
    }).populate({
      path: 'categoryInfo',
      select: 'title',
    });

    if (!content) {
      return false;
    }

    return JSON.stringify(content);
  } catch (error) {
    console.log(error);
    return false;
  }
};
