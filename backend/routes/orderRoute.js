import express from "express"
import { addOrderItems } from "../controllers/orderController.js"
import protect from "../middleware/authMiddleware.js"

const orderRouter = express.Router()

orderRouter.post("/", protect, addOrderItems)

export default orderRouter
