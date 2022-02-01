import nc from 'next-connect';
import crypto from 'crypto';

import { dbConnect, filterObject } from 'utils';
import User from 'models/userModel';
import { firebaseAdmin } from 'services/firebaseAdmin';
import Email from 'utils/email';

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: {
        message: err.message || 'Server Error',
      },
    });
  },
});

// Setup account
handler.post(async (req, res, next) => {
  const tenantAuth = firebaseAdmin
    .auth()
    .tenantManager()
    .authForTenant(req.body.tenant_google_id);

  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'email',
    'password',
    'token',
    'tenant_mongo_id',
    'tenant_google_id'
  );

  // Throw error if no token
  if (!filteredBody.token) {
    throw new Error('Please provide a valid token.');
  }

  // Hash token
  const hashedToken = crypto
    .createHash('sha256')
    .update(filteredBody.token)
    .digest('hex');

  const user = await User.findOne({
    inviteToken: hashedToken,
    inviteTokenExpires: { $gt: Date.now() },
    email: filteredBody.email,
    tenant: filteredBody.tenant_mongo_id,
  });

  if (!user) {
    throw new Error('Token is invalid or has expired.');
  }

  // Update user in Google
  await tenantAuth.updateUser(user.id, {
    password: filteredBody.password,
  });

  // Remove token and expiration in MongoDB
  // and set to active
  user.inviteToken = undefined;
  user.inviteTokenExpires = undefined;
  user.status = 'active';

  await user.save();

  // Send welcome email
  await new Email(user).sendWelcome();

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
