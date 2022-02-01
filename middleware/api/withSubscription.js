import Subscription from 'models/subscriptionModel';

export const withSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      tenant: req.user.tenant_mongo_id,
      $or: [{ status: 'active' }, { status: 'trialing' }],
    });

    if (!subscription) {
      return res.status(403).json({
        success: false,
        data: {
          message: `Active subscription not found.`,
        },
      });
    }

    req.subscription = subscription;
  } catch (error) {
    return res.status(403).json({
      success: false,
      data: {
        message: `Active subscription not found.`,
      },
    });
  }

  next();
};
