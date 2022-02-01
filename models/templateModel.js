import mongoose from 'mongoose';

import Tenant from './tenantModel';

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled Template',
    },
    frame: {
      type: String,
      default: '',
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
    },
    status: {
      type: String,
      enum: ['drafted', 'preview', 'published'],
      default: 'drafted',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Template =
  mongoose.models.Template || mongoose.model('Template', templateSchema);

export default Template;
