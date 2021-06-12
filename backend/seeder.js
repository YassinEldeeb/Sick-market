import mongoose from 'mongoose'
import colors from 'colors'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Coupon from './models/couponModel.js'
import User from './models/userModel.js'
import users from './data/users.js'
import products from './data/products.js'
import connectDB from './db/mongoose.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Coupon.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err.message.red.inverse)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Coupon.deleteMany()
    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err.message.red.inverse)
    process.exit(1)
  }
}
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
