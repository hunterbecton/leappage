import mongoose from 'mongoose';

import Tenant from './tenantModel';

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled media',
    },
    url: {
      type: String,
      default: '',
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

export default Media;
