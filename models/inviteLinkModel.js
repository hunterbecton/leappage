import mongoose from 'mongoose';
import validator from 'validator';

const inviteLinkSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    inviteToken: {
      type: String,
      required: [true, 'Invite token is required.'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const InviteLink =
  mongoose.models.InviteLink || mongoose.model('InviteLink', inviteLinkSchema);

export default InviteLink;
