import { dbConnect } from 'utils';
import Template from 'models/templateModel';

dbConnect();

export const withTemplates = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id };

    const totalTemplates = await Template.countDocuments(filter);

    const templates = await Template.find({
      tenant: ctx.req.user.tenant_mongo_id,
    })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalTemplates, templates });
  } catch (error) {
    console.log(error);
    return false;
  }
};
