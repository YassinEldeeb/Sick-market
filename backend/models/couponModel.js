import mongoose from "mongoose"

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isPercent: { type: Boolean, required: true, default: true },
    amount: { type: Number, required: true },
    expireDate: { type: String, required: true, default: "7 days" },
    isActive: { type: Boolean, required: true, default: true },
  },

  { timestamps: true }
)

const Coupon = mongoose.model("Coupon", couponSchema)

export default Coupon
