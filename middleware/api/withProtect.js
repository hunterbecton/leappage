const { parseCookies } = require('nookies');

import { firebaseAdmin } from 'services/firebaseAdmin';

export const withProtect = async (req, res, next) => {
  try {
    const cookies = parseCookies({ req });

    if (!cookies.lptoken) {
      return res.status(403).json({
        success: false,
        data: {
          message: `Please log in to get access.`,
        },
      });
    }

    const user = await firebaseAdmin.auth().verifyIdToken(cookies.lptoken);

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
