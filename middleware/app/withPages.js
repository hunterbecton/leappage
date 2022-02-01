import { dbConnect } from 'utils';
import Page from 'models/pageModel';

dbConnect();

export const withPages = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id };

    const totalPages = await Page.countDocuments(filter);

    const pages = await Page.find({
      tenant: ctx.req.user.tenant_mongo_id,
      user: ctx.req.user.uid,
    })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalPages, pages });
  } catch (error) {
    console.log(error);
    return false;
  }
};
