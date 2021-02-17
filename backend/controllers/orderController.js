import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import Coupon from "../models/couponModel.js"

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
    voucherRemaining,
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
      throw new Error("Invalid Coupon Code")
    }
  }

  await res.status(201).send(order)
})

const getOrderById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    throw new Error("Id is required to fetch Order")
  }
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email name"
  )
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.rank === "user"
  ) {
    throw new Error("Order not Found!")
  }
  if (!order) {
    throw new Error("Order not Found!")
  }
  res.send({ order })
})

export { addOrderItems, getOrderById }
