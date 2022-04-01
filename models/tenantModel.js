import mongoose from 'mongoose';

import validator from 'validator';

const tenantSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    tenantId: {
      type: String,
      unique: true,
      required: [true, 'Tenant ID is required.'],
    },
    stripeId: {
      type: String,
      unique: true,
      required: [true, 'Stripe ID is required.'],
    },
    addressOne: {
      type: String,
      trim: true,
    },
    addressTwo: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
      trim: true,
      default: null,
      index: {
        unique: true,
        partialFilterExpression: { domain: { $type: 'string' } },
      },
    },
    subdomain: {
      type: String,
      unique: true,
      required: [true, 'Subdomain is required.'],
      min: [4, 'Subdomain must contain at least 4 characters.'],
      max: [20, 'Subdomain cannot contain more than 20 characters.'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', tenantSchema);

export default Tenant;
