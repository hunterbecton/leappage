import nc from "next-connect";
import Stripe from "stripe";

import { dbConnect } from "utils";
import { withProtect } from "middleware/api/withProtect";

dbConnect();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: {
        message: err.message || "Server Error",
      },
    });
  },
});

// Protect routes
handler.use(withProtect);

// Get Stripe Session
handler.get(async (req, res, next) => {
  const { id } = req.query;

  const session = await stripe.billingPortal.sessions.create({
    customer: id,
    return_url: `https://${req.headers.host}/account/subscription`,
  });

  return res.status(200).json({
    success: true,
    data: {
      session,
    },
  });
});

export default handler;
