import { dbConnect, checkValidMongoId } from 'utils';
import Page from 'models/pageModel';

dbConnect();

export const withPublishedPage = async (ctx) => {
  try {
    let page;

    const { id } = ctx.params;

    // Get page pased on Mongo ID
    if (checkValidMongoId(id)) {
      page = await Page.findOne({
        _id: id,
        status: 'published',
      });
    }
    // Get page passed on slug
    else {
      page = await Page.findOne({
        slug: id,
        status: 'published',
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
