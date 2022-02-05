import nookies from 'nookies';
import fetch from 'node-fetch';

import { firebaseAdmin } from 'services/firebaseAdmin';

export const withProtect = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    // No cookies no login
    if (!cookies.lptoken && !cookies.lprefresh) {
      return false;
    }
    // Attempt to get new token from refresh token
    else if (!cookies.lptoken && cookies.lprefresh) {
      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.GCS_WEB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: cookies.lprefresh,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        nookies.set(ctx, 'lptoken', data.access_token, {
          maxAge: 3600,
          secure: true,
          sameSite: 'strict',
          path: '/',
        });

        const user = await firebaseAdmin
          .auth()
          .verifyIdToken(data.access_token);

        ctx.req.user = user;

        return true;
      } else {
        return false;
      }
    }
    // Verify user with auth token
    else if (cookies.lptoken && cookies.lprefresh) {
      const user = await firebaseAdmin.auth().verifyIdToken(cookies.lptoken);

      ctx.req.user = user;

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
