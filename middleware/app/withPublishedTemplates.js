import { dbConnect } from 'utils';
import Template from 'models/templateModel';

dbConnect();

export const withPublishedTemplates = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id, status: 'published' };

    const totalTemplates = await Template.countDocuments(filter);

    const templates = await Template.find(filter)
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalTemplates, templates });
  } catch (error) {
    console.log(error);
    return false;
  }
};
