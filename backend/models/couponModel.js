import mongoose from 'mongoose'

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    limited: { type: Number },
    numOfUsedTimes: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },
    isPercent: { type: Boolean, default: false },
  },

  { timestamps: true }
)

const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon
