import { dbConnect } from 'utils';
import User from 'models/userModel';

dbConnect();

export const withUser = async (ctx) => {
  try {
    const user = await User.findOne({
      _id: ctx.req.user.uid,
      tenant: ctx.req.user.tenant_mongo_id,
    });

    if (!user) {
      return false;
    }

    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    return false;
  }
};
