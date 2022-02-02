import nc from 'next-connect';
import crypto from 'crypto';

import { dbConnect } from 'utils';
import User from 'models/userModel';
import Tenant from 'models/tenantModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';
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

// Protect routes
handler.use(withProtect);

// Check subscription
handler.use(withSubscription);

// Restrict routes
handler.use(withRestrict('admin', 'editor'));

// Resend Invite
handler.get(async (req, res, next) => {
  const { id } = req.query;

  const user = await User.findOne({
    tenant: req.user.tenant_mongo_id,
    _id: id,
    status: 'pending',
  });

  if (!user) {
    throw new Error('User not found.');
  }

  // Generate invite token
  const token = crypto.randomBytes(32).toString('hex');

  const inviteToken = crypto.createHash('sha256').update(token).digest('hex');

  const now = new Date();

  const inviteTokenExpires = now.setDate(now.getDate() + 1); // Expires in 24 hours

  user.inviteToken = inviteToken;

  user.inviteTokenExpires = inviteTokenExpires;

  await user.save();

  // Get tenant from MongoDB
  const tenant = await Tenant.findById(req.user.tenant_mongo_id);

  //Send invite email
  const url = `http://${req.headers.host}/setup?token=${token}`;

  await new Email(user, url, tenant.company).sendInvite();

  return res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

export default handler;
