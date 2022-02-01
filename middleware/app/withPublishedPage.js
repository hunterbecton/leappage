import mongoose from 'mongoose';

import { dbConnect } from 'utils';
import Page from 'models/pageModel';

dbConnect();

export const withPublishedPage = async (ctx) => {
  try {
    let page;

    const { id } = ctx.params;

    // Get page pased on Mongo ID
    if (mongoose.isValidObjectId(id)) {
      page = await Page.findOne({
        _id: id,
        status: 'published',
      });
    }
    // Get page passed on slug
    else if (!mongoose.isValidObjectId(id)) {
      page = await Page.findOne({
        slug: id,
        status: 'published',
      });
    }
    // Get page pased on slug
    else {
      return false;
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
