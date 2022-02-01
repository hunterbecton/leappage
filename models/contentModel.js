import mongoose from 'mongoose';

import Tenant from './tenantModel';
import Category from './categoryModel';

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: 'Untitled Content',
    },
    url: {
      type: String,
      trim: true,
      default: 'https://leappage.com',
    },
    status: {
      type: String,
      enum: ['drafted', 'preview', 'published'],
      default: 'drafted',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    feature: {
      type: String,
      trim: true,
      default: 'https://dummyimage.com/672x512/f3f4f6/1f2937.jpg',
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
    },
    content: {
      type: String,
      default: '',
    },
    hosted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Populate Category
contentSchema.virtual('categoryInfo', {
  ref: Category,
  foreignField: '_id',
  localField: 'category',
});

const Content =
  mongoose.models.Content || mongoose.model('Content', contentSchema);

export default Content;
