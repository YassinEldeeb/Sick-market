import express from 'express'
import {
  generateCouponCode,
  validateCouponCode,
  deleteCouponCode,
  getAllCoupons,
} from '../controllers/couponsController'
import { protect, admin } from '../middleware/authMiddleware'

const couponRouter = express.Router()

couponRouter.post('/', protect, admin, generateCouponCode)

couponRouter.get('/', protect, getAllCoupons, generateCouponCode)

couponRouter.post('/use', protect, validateCouponCode)

couponRouter.delete('/:code', protect, admin, deleteCouponCode)

export default couponRouter
