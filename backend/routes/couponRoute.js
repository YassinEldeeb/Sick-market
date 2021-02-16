import express from "express"
import {
  generateCouponCode,
  validateCouponCode,
  deleteCouponCode,
} from "../controllers/couponsController.js"
import protect from "../middleware/authMiddleware.js"

const couponRouter = express.Router()

couponRouter.post("/", protect, generateCouponCode)

couponRouter.post("/use", protect, validateCouponCode)

couponRouter.delete("/", protect, deleteCouponCode)

export default couponRouter
