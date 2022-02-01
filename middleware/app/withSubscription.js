import { dbConnect } from 'utils';
import Subscription from 'models/subscriptionModel';

dbConnect();

export const withSubscription = async (ctx) => {
  try {
    const subscription = await Subscription.findOne({
      tenant: ctx.req.user.tenant_mongo_id,
    })
      .populate({
        path: 'productInfo',
        select: 'title featureImg stripeId',
      })
      .populate({
        path: 'tenantInfo',
        select: 'stripeId',
      });

    if (!subscription) {
      return false;
    }

    return JSON.stringify(subscription);
  } catch (error) {
    console.log(error);
    return false;
  }
};
