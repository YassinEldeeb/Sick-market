import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Coupon from '../models/couponModel.js'
import { orderPlaced } from '../emails/account.js'
import { format } from 'date-fns'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
    couponDiscount,
    code,
  } = req.body
  if (req.user.status !== 'Verified') {
    throw new Error("Email isn't verified")
  }
  if (!orderItems || !orderItems.length) {
    res.status(400)
    throw new Error('Cart is empty')
  }
  if (!req.user.canOrder) {
    res.status(405)
    throw new Error('You are prohibited from ordering by Admins')
  }
  orderItems.forEach(async (e) => {
    const product = await Product.findById(e.product)
    product.countInStock = product.countInStock - e.qty
    product.paidStock = product.paidStock + e.qty
    product.paidAmount = product.paidAmount + e.qty * e.price
    await product.save()
  })
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
    couponDiscount,
  })
  await order.save()
  if (code) {
    const usedCoupon = await Coupon.findOne({ code })
    if (usedCoupon) {
      usedCoupon.numOfUsedTimes = usedCoupon.numOfUsedTimes + 1
      if (usedCoupon.numOfUsedTimes === usedCoupon.limited) {
        await usedCoupon.remove()
      } else {
        await usedCoupon.save()
      }
    } else {
      res.status(400)
      throw new Error('Invalid Coupon Code')
    }
  }
  const user = await User.findById(order.user)

  orderPlaced(order, user.email)
  const newStock = order.orderItems.map((e) => {
    return { _id: e.product, countInStock: e.qty }
  })
  req.app.get('socketService').emiter('StockChanged', newStock, 'Admins')

  await res.status(201).send(order)
})

const getOrderById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Id is required to fetch Order')
  }
  const order = await Order.findById(req.params.id).populate(
    'user',
    'email name'
  )

  if (!order) {
    res.status(404)

    throw new Error('Order not Found!')
  }
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.rank === 'user'
  ) {
    res.status(404)

    throw new Error('Order not Found!')
  }

  res.send({ order })
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)

    throw new Error('Id is required to fetch Order')
  }
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not Found!')
  }
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.rank === 'user'
  ) {
    res.status(404)
    throw new Error('Order not Found!')
  }
  order.paymentResult = {
    orderID: req.body.orderID,
    payerID: req.body.payerID,
    facilitatorAccessToken: req.body.facilitatorAccessToken,
  }
  order.isPaid = true
  const date = format(Date.now(), 'yyyy-MM-dd / hh:mm a')

  order.paidAt = date

  req.user.totalPaidOrders = (
    req.user.totalPaidOrders + order.totalPrice
  ).toFixed(2)
  await req.user.save()

  await order.save()
  res.send({ order })
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)

    throw new Error('Id is required to fetch Order')
  }
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not Found!')
  }
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.rank === 'user'
  ) {
    res.status(404)
    throw new Error('Order not Found!')
  }
  order.isDelivered = true
  const date = format(Date.now(), 'yyyy-MM-dd / hh:mm a')

  order.deliveredAt = date

  await order.save()
  res.send(date)
})

const getMyOrders = asyncHandler(async (req, res) => {
  const user = req.user
  await user
    .populate({
      path: 'orders',
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
    })
    .execPopulate()

  res.send(user.orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
}
