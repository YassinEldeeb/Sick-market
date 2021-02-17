import express from "express"
import { addOrderItems, getOrderById } from "../controllers/orderController.js"
import protect from "../middleware/authMiddleware.js"

const orderRouter = express.Router()

orderRouter.post("/", protect, addOrderItems)
orderRouter.get("/:id", protect, getOrderById)

export default orderRouter
