import nc from 'next-connect';
import Stripe from 'stripe';

import { dbConnect } from 'utils';
import { withProtect } from 'middleware/api/withProtect';
import User from 'models/userModel';
import Subscription from 'models/subscriptionModel';
import Tenant from 'models/tenantModel';

dbConnect();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

// Get Stripe Session
handler.get(async (req, res, next) => {
  // Get Customer ID
  const tenant = await Tenant.findById(req.user.tenant_mongo_id);

  // Check if tenant has active subscription
  const activeSubscription = await Subscription.findOne({
    tenant: tenant._id,
    status: 'active',
  });

  if (activeSubscription) {
    throw new Error('Your team already has an active subscription.');
  }

  // Count number of users
  const totalUsers = await User.countDocuments({
    tenant: req.user.tenant_mongo_id,
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: 'price_1KMD0DKCnDQmRy7gZGHBCf2Z',
        quantity: totalUsers,
      },
    ],
    customer: tenant.stripeId,
    success_url: `https://${process.env.HOST}/account/subscription`,
    cancel_url: `https://${process.env.HOST}/account/subscription`,
  });

  return res.status(200).json({
    success: true,
    data: {
      session,
    },
  });
});

export default handler;
