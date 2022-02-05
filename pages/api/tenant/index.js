import nc from "next-connect";

import { dbConnect, filterObject } from "utils";
import { firebaseAdmin } from "services/firebaseAdmin";
import Tenant from "models/tenantModel";
import User from "models/userModel";
import Stripe from "stripe";
import Email from "utils/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    res.status(500).end(err.toString());
  },
});

// Create Tenant
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    "email",
    "name",
    "password",
    "company",
    "subdomain"
    // 'inviteCode'
  );

  // // Return error if no invite on body
  // if (!filteredBody.inviteCode) {
  //   return next(new AppError(`Sign up is invite only during beta.`, 400));
  // }

  // // Check invite code
  // const inviteCode = await InviteCode.findOne({
  //   email: filteredBody.email,
  //   code: filteredBody.inviteCode,
  // });

  // // Return error if invite doesn't exist
  // if (!inviteCode) {
  //   return next(new AppError(`Sign up is invite only during beta.`, 400));
  // }

  // // Return error if invite exists but not active
  // if (inviteCode && !inviteCode.active) {
  //   return next(new AppError(`Invite code has been used.`, 400));
  // }

  const tenantManager = firebaseAdmin.auth().tenantManager();

  const restrictedSubdomain =
    filteredBody.subdomain === "cdn" ||
    filteredBody.subdomain === "www" ||
    filteredBody.subdomain === "webhook" ||
    filteredBody.subdomain === "webhooks" ||
    filteredBody.subdomain === "staging" ||
    filteredBody.subdomain === "admin" ||
    filteredBody.subdomain === "tuna" ||
    filteredBody.subdomain === "docs" ||
    filteredBody.subdomain === "render" ||
    filteredBody.subdomain === "api" ||
    filteredBody.subdomain === "demo" ||
    filteredBody.subdomain === "app" ||
    filteredBody.subdomain === "leappage";

  // Check if tenant with subdomain already exists
  const currentTenant = await Tenant.findOne({
    subdomain: filteredBody.subdomain,
  });

  if (currentTenant || restrictedSubdomain) {
    throw new Error("Subdomain already in use.");
  }

  // Create a new tenant in Google
  const newGoogleTenant = await tenantManager.createTenant({
    displayName: filteredBody.subdomain,
    emailSignInConfig: {
      enabled: true,
      passwordRequired: true,
    },
  });

  // Create new customer in Stripe
  const newStripeCustomer = await stripe.customers.create({
    email: filteredBody.email,
    name: filteredBody.company,
  });

  // Create new tenant in MongoDB
  const newTenant = await Tenant.create({
    company: filteredBody.company,
    email: filteredBody.email,
    tenantId: newGoogleTenant.tenantId,
    stripeId: newStripeCustomer.id,
    subdomain: filteredBody.subdomain,
  });

  // Create new user admin in MongoDB
  const newAdmin = await User.create({
    name: filteredBody.name,
    email: filteredBody.email,
    role: "admin",
    status: "active",
    tenant: newTenant._id,
  });

  const tenantAuth = firebaseAdmin
    .auth()
    .tenantManager()
    .authForTenant(newGoogleTenant.tenantId);

  // Create new user in Google
  const newGoogleUser = await tenantAuth.createUser({
    uid: newAdmin.id,
    email: filteredBody.email,
    emailVerified: false,
    password: filteredBody.password,
    displayName: filteredBody.name,
    disabled: false,
  });

  // Set user claims in Google
  await tenantAuth.setCustomUserClaims(newGoogleUser.uid, {
    role: "admin",
    tenant_mongo_id: newTenant._id,
  });

  // // Create Mattermix starter subscription in Stripe
  // // Stripe webhook will create subscription in MongoDB
  // await stripe.subscriptions.create({
  //   customer: newStripeCustomer.id,
  //   items: [
  //     {
  //       price: process.env.STRIPE_SUB_STARTER,
  //     },
  //   ],
  // });

  // Send welcome email
  await new Email(newAdmin).sendWelcome();

  // // Notify Zapier webhook of new Tenant
  // await fetch('https://hooks.zapier.com/hooks/catch/11395557/bmgd5yl/', {
  //   method: 'POST',
  //   body: JSON.stringify(newTenant),
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // // Update invite code
  // inviteCode.active = false;
  // await inviteCode.save();

  return res.status(200).json({
    success: true,
    data: {
      subdomain: newTenant.subdomain,
    },
  });
});

export default handler;
