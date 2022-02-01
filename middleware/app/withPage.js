import { dbConnect } from 'utils';
import Page from 'models/pageModel';

dbConnect();

export const withPage = async (ctx) => {
  try {
    const { id } = ctx.params;

    const page = await Page.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
      user: ctx.req.user.uid,
    });

    if (!page) {
      return false;
    }

    return JSON.stringify(page);
  } catch (error) {
    console.log(error);
    return false;
  }
};
