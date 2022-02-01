import { dbConnect } from 'utils';
import Category from 'models/categoryModel';

dbConnect();

export const withCategories = async (ctx) => {
  try {
    const { index } = ctx.params;

    const page = index * 1 || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    let filter = { tenant: ctx.req.user.tenant_mongo_id };

    const totalCategories = await Category.countDocuments(filter);

    const categories = await Category.find({
      tenant: ctx.req.user.tenant_mongo_id,
    })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    return JSON.stringify({ totalCategories, categories });
  } catch (error) {
    console.log(error);
    return false;
  }
};
