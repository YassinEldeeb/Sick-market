import express from "express"
import {
  generateCouponCode,
  validateCouponCode,
  deleteCouponCode,
} from "../controllers/couponsController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const couponRouter = express.Router()

couponRouter.post("/", protect, admin, generateCouponCode)

couponRouter.post("/use", protect, validateCouponCode)

couponRouter.delete("/", protect, admin, deleteCouponCode)

export default couponRouter
