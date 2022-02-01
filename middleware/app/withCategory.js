import { dbConnect } from 'utils';
import Category from 'models/categoryModel';

dbConnect();

export const withCategory = async (ctx) => {
  try {
    const { id } = ctx.params;

    const category = await Category.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
    });

    if (!category) {
      return false;
    }

    return JSON.stringify(category);
  } catch (error) {
    console.log(error);
    return false;
  }
};
