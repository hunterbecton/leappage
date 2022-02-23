import mongoose from 'mongoose';
import validator from 'validator';

import Tenant from './tenantModel';

const themeSchema = new mongoose.Schema(
  {
    primary: {
      type: String,
      default: '#3b82f6',
      validate: [
        validator.isHexColor,
        'Please provide a valid hex color code.',
      ],
    },
    primaryLight: {
      type: String,
      default: '#dbeafe',
      validate: [
        validator.isHexColor,
        'Please provide a valid hex color code.',
      ],
    },
    primaryHover: {
      type: String,
      default: '#2563eb',
      validate: [
        validator.isHexColor,
        'Please provide a valid hex color code.',
      ],
    },
    fontFamily: {
      type: String,
      default: 'Inter',
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tenant,
      required: [true, 'Tenant is required.'],
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Theme = mongoose.models.Theme || mongoose.model('Theme', themeSchema);

export default Theme;
