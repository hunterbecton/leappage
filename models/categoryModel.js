import mongoose from 'mongoose';

import Tenant from './tenantModel';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled Category',
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
