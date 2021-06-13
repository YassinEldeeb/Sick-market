import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SubscriptionSchema = new Schema(
  {
    endpoint: {
      type: String,
      required: true,
      unique: true,
    },
    keys: {
      type: Object,
      required: true,
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
  { timestamps: true }
)

const Subscription = mongoose.model('subscription', SubscriptionSchema)

export default Subscription
