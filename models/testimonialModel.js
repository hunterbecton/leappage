import mongoose from 'mongoose';

import Tenant from './tenantModel';
import Category from './categoryModel';

const testimonialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: 'Untitled Testimonial',
    },
    quote: {
      type: String,
      trim: true,
      default: '',
    },
    profileImage: {
      type: String,
      trim: true,
      default: 'https://dummyimage.com/300x300/f3f4f6/1f2937.jpg',
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    position: {
      type: String,
      trim: true,
      default: '',
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
    status: {
      type: String,
      enum: ['drafted', 'preview', 'published'],
      default: 'drafted',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Populate Category
testimonialSchema.virtual('categoryInfo', {
  ref: Category,
  foreignField: '_id',
  localField: 'category',
});

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
