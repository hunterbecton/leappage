import { dbConnect } from 'utils';
import User from 'models/userModel';

dbConnect();

export const withTeammate = async (ctx) => {
  try {
    const { id } = ctx.params;

    const teammate = await User.findOne({
      _id: id,
      tenant: ctx.req.user.tenant_mongo_id,
    });

    if (!teammate) {
      return false;
    }

    return JSON.stringify(teammate);
  } catch (error) {
    console.log(error);
    return false;
  }
};
