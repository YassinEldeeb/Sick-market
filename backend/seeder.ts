import mongoose from 'mongoose'
import colors from 'colors'
import Product from './models/productModel'
import Order from './models/orderModel'
import Coupon from './models/couponModel'
import User from './models/userModel'
import users from './data/users'
import products from './data/products'
import connectDB from './db/mongoose'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Coupon.deleteMany()
    const createdUsers = await User.insertMany(users as any)
    const adminUser = createdUsers[0]._id

    const sampleProducts: any = products.map((product) => {
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
