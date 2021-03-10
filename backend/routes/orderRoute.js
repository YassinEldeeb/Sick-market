import express from "express"
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

const orderRouter = express.Router()

orderRouter.post("/", protect, addOrderItems)
orderRouter.get("/myOrders", protect, getMyOrders)
orderRouter.get("/:id", protect, getOrderById)
orderRouter.patch("/:id/pay", protect, updateOrderToPaid)

export default orderRouter
