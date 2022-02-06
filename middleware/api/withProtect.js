import nookies, { parseCookies } from 'nookies';
import fetch from 'node-fetch';

import { firebaseAdmin } from 'services/firebaseAdmin';

export const withProtect = async (req, res, next) => {
  try {
    const cookies = parseCookies({ req });

    let user;

    // No cookies no login
    if (!cookies.lptoken && !cookies.lprefresh) {
      return res.status(403).json({
        success: false,
        data: {
          message: `Please log in to get access.`,
        },
      });
    } // Attempt to get new token from refresh token
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

        user = await firebaseAdmin.auth().verifyIdToken(data.access_token);
      } else {
        return res.status(403).json({
          success: false,
          data: {
            message: `Please log in to get access.`,
          },
        });
      }
    } // Verify user with auth token
    else if (cookies.lptoken && cookies.lprefresh) {
      user = await firebaseAdmin.auth().verifyIdToken(cookies.lptoken);
    }

    req.user = user;
  } catch (error) {
    return res.status(403).json({
      success: false,
      data: {
        message: `Please log in to get access.`,
      },
    });
  }

  next();
};
