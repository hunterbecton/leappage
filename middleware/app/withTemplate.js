import { dbConnect } from 'utils';
import Template from 'models/templateModel';

dbConnect();

export const withTemplate = async (ctx) => {
  try {
    const { id } = ctx.params;

    const template = await Template.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
    });

    if (!template) {
      return false;
    }

    return JSON.stringify(template);
  } catch (error) {
    console.log(error);
    return false;
  }
};
