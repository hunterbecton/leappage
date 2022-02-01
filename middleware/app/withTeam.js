import { dbConnect } from 'utils';
import User from 'models/userModel';

dbConnect();

export const withTeam = async (ctx) => {
  try {
    const team = await User.find({
      tenant: ctx.req.user.tenant_mongo_id,
    });

    if (!team) {
      return false;
    }

    return JSON.stringify(team);
  } catch (error) {
    console.log(error);
    return false;
  }
};
