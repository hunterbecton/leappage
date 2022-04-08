import { dbConnect, checkValidMongoId } from 'utils';
import Page from 'models/pageModel';

dbConnect();

export const withPagePathname = async (ctx) => {
  try {
    const { pathname } = ctx.params;

    // Check if pathname is MongoDB ID
    const isMongoId = checkValidMongoId(pathname);

    let page;

    if (isMongoId) {
      page = await Page.findOne({
        _id: pathname,
        tenant: ctx.req.user.tenant_mongo_id,
        user: ctx.req.user.uid,
      });
    } else {
      page = await Page.findOne({
        slug: pathname,
        tenant: ctx.req.user.tenant_mongo_id,
        user: ctx.req.user.uid,
      });
    }

    if (!page) {
      return false;
    }

    return JSON.stringify(page);
  } catch (error) {
    console.log(error);
    return false;
  }
};
