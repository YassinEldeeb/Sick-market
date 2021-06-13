import mongoose from 'mongoose'
import chalk from 'chalk'

const connectDB = async () => {
  try {
    const connect: any = await mongoose.connect(process.env.MONGO_URI as any, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log(chalk.underline.cyan.bold(connect.connection.host))
  } catch (err: any) {
    console.error(chalk.red.underline.bold(err.message))
    process.exit(1)
  }
}
export default connectDB
