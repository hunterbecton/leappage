import mongoose from 'mongoose';

import Tenant from './tenantModel';
import User from './userModel';

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled Page',
    },
    frame: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, 'User is required.'],
    },
    status: {
      type: String,
      enum: ['drafted', 'preview', 'published'],
      default: 'drafted',
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Populate user
pageSchema.virtual('userInfo', {
  ref: User,
  foreignField: '_id',
  localField: 'user',
});

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
