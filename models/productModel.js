import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    featureImg: {
      type: String,
      default: '',
    },
    stripeId: {
      type: String,
      required: [true, 'Stripe ID is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
