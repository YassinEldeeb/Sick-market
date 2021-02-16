import mongoose from "mongoose"

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
    isPercent: { type: Boolean, required: true, default: true },
    amount: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },

  { timestamps: true }
)

const Coupon = mongoose.model("Coupon", couponSchema)

export default Coupon
