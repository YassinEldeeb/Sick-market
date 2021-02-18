import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import Coupon from "../models/couponModel.js"
import { orderPlaced } from "../emails/account.js"

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
  if (!orderItems || !orderItems.length) {
    res.status(400)
    throw new Error("Cart is empty")
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
      throw new Error("Invalid Coupon Code")
    }
  }

  await res.status(201).send(order)
})

const getOrderById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error("Id is required to fetch Order")
  }
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email name"
  )

  if (!order) {
    res.status(404)

    throw new Error("Order not Found!")
  }
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.rank === "user"
  ) {
    res.status(404)

    throw new Error("Order not Found!")
  }

  await orderPlaced(order, order.user.email)
  res.send({ order })
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)

    throw new Error("Id is required to fetch Order")
  }
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error("Order not Found!")
  }
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.rank === "user"
  ) {
    res.status(404)
    throw new Error("Order not Found!")
  }
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  }
  order.isPaid = true
  order.paidAt = Date.now()
  await order.save()
  res.send({ order })
})

export { addOrderItems, getOrderById, updateOrderToPaid }
