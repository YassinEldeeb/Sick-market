import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log(connect.connection.host.cyan.underline.bold)
  } catch (err) {
    console.error(err.message.red.underline.bold)
    process.exit(1)
  }
}
export default connectDB
