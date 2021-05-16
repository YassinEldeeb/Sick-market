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
  const productsProblems = []
  const products = []

  for (let i = 0; i < orderItems.length + 1; i++) {
    const e = orderItems[i]
    if (e) {
      const product = await Product.findById(e.product)
      products.push(product)
      if (!product) {
        productsProblems.push({ id: e.product, error: 'removed' })
      } else if (product.countInStock === 0) {
        productsProblems.push({ id: product._id, error: 'soldOut' })
      }
    } else if (i === orderItems.length) {
      if (productsProblems.length) {
        res.status(400)
        throw new Error(
          JSON.stringify({ type: 'confirm', error: productsProblems })
        )
      }
      orderItems.forEach(async (e, i) => {
        const product = products[i]
        if (product) {
          product.countInStock = product.countInStock - e.qty
          product.paidStock = product.paidStock + e.qty
          product.paidAmount = product.paidAmount + e.qty * e.price
          await product.save()
        }
      })
    }
  }

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
    'rank availablePic email totalPaidOrders _id name profilePicLink'
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
  const orders = await Order.find({ user: user._id })
    .limit(parseInt(req.query.limit ? req.query.limit : 0))
    .skip(parseInt(req.query.skip ? req.query.skip : 0))
    .sort({ createdAt: -1 })

  res.send(orders)
})

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .limit(parseInt(req.query.limit ? req.query.limit : 0))
    .skip(parseInt(req.query.skip ? req.query.skip : 0))
    .populate(
      'user',
      'rank availablePic email totalPaidOrders _id name profilePicLink'
    )
    .sort({ createdAt: -1 })
  const count = await Order.countDocuments()

  res.send({ orders, count })
})

const getOrderAdminById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'rank availablePic email totalPaidOrders _id name profilePicLink'
  )

  if (!order) {
    res.status(404)
    throw new Error('Order Not Found')
  }

  res.send(order)
})

const updateOrderToApproved = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order Not Found')
  }

  order.approved = Date.now()
  await order.save()

  res.send({ approved: order.approved })
})
const updateOrderToRejected = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  const { reason } = req.body

  if (!order) {
    res.status(404)
    throw new Error('Order Not Found')
  }
  if (!reason) {
    res.status(400)
    throw new Error('Reason is required to Reject Order')
  }
  order.approved = undefined
  order.rejected = { reason, date: Date.now() }
  await order.save()

  res.send({ rejected: order.rejected })
})
const updateOrderToPacked = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order Not Found')
  }
  if (!order.approved) {
    res.status(404)
    throw new Error(`Order need to be approved first!`)
  }

  order.packed = Date.now()
  await order.save()

  res.send({ packed: order.packed })
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getAllOrders,
  getOrderAdminById,
  updateOrderToApproved,
  updateOrderToRejected,
  updateOrderToPacked,
}
