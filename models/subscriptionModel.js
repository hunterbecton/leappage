import mongoose from 'mongoose';

import Tenant from './tenantModel';
import Product from './productModel';

const subscriptionSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
      unique: true,
    },
    stripeSubId: {
      type: String,
      required: [true, 'Stripe sub ID is required'],
    },
    stripeSubItemId: {
      type: String,
      required: [true, 'Stripe item ID is required'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: [true, 'Product is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
    },
    status: {
      type: String,
      enum: [
        'incomplete',
        'incomplete_expired',
        'trialing',
        'active',
        'past_due',
        'canceled',
        'unpaid',
      ],
      default: 'incomplete',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate product
subscriptionSchema.virtual('productInfo', {
  ref: Product,
  foreignField: '_id',
  localField: 'product',
});

// Populate tenant
subscriptionSchema.virtual('tenantInfo', {
  ref: Tenant,
  foreignField: '_id',
  localField: 'tenant',
});

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
