import nookies from 'nookies';

import { firebaseAdmin } from 'services/firebaseAdmin';

export const withProtect = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    if (!cookies.lptoken) {
      return false;
    }

    const user = await firebaseAdmin.auth().verifyIdToken(cookies.lptoken);

    ctx.req.user = user;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
