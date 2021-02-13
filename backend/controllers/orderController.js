import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
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
  })
  await order.save()
  res.status(201).send(order)
})

export { addOrderItems }
