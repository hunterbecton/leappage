import { buffer } from 'micro';
import nc from 'next-connect';
import Stripe from 'stripe';

import Subscription from 'models/subscriptionModel';
import Tenant from 'models/tenantModel';
import Product from 'models/productModel';
import { dbConnect } from 'utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WH_SECRET;

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  },
});

const handleSubscription = async (event) => {
  const {
    id,
    current_period_end,
    current_period_start,
    customer,
    plan,
    status,
    items,
    quantity,
  } = event.data.object;

  // Find tenant from Stripe customer ID
  const tenant = await Tenant.findOne({ stripeId: customer });

  // Find product from plan ID
  const product = await Product.findOne({ stripeId: plan.id });

  // Check if Subscription exists
  let subscription = await Subscription.findOne({
    tenant: tenant.id,
  });

  // Update if exists
  if (subscription) {
    subscription.stripeSubId = id;
    subscription.stripeSubItemId = items.data[0].id;
    subscription.product = product.id;
    subscription.startDate = current_period_start;
    subscription.endDate = current_period_end;
    subscription.status = status;
    subscription.quantity = quantity;

    await subscription.save();
  }
  // Crate new if doesn't exist
  else {
    await Subscription.create({
      tenant: tenant.id,
      stripeSubId: id,
      stripeSubItemId: items.data[0].id,
      product: product.id,
      startDate: current_period_start,
      endDate: current_period_end,
      status,
      quantity,
    });
  }
};

// Stripe webhook
handler.post(async (req, res) => {
  let event;
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

  switch (event.type) {
    case 'customer.subscription.created':
      await handleSubscription(event);
      break;
    case 'customer.subscription.updated':
      await handleSubscription(event);
      break;
    case 'customer.subscription.deleted':
      await handleSubscription(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
