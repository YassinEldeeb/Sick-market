import mongoose from "mongoose"

const Schema = mongoose.Schema
const secretCode = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
})

const SecretCode = mongoose.model("secretCode", secretCode)

export default SecretCode
