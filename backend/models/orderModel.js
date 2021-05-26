import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true, trim: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      governorate: { type: String, required: true, trim: true },
      lat: { type: String, required: true, trim: true },
      lon: { type: String, required: true, trim: true },
      accurate: { type: Boolean },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      orderID: { type: String },
      payerID: { type: String },
      facilitatorAccessToken: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    approved: {
      type: Date,
    },
    rejected: {
      reason: { type: String },
      date: { type: Date },
    },
    packed: {
      type: Date,
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
