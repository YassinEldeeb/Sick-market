import express from 'express'
import {
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
} from '../controllers/orderController'
import { protect, admin } from '../middleware/authMiddleware'

const orderRouter = express.Router()

orderRouter.post('/', protect, addOrderItems)
orderRouter.get('/myOrders', protect, getMyOrders)
orderRouter.get('/allOrders', protect, admin, getAllOrders)
orderRouter.get('/admin/:id', protect, admin, getOrderAdminById)
orderRouter.get('/:id', protect, getOrderById)
orderRouter.patch('/:id/pay', protect, updateOrderToPaid)
orderRouter.patch('/:id/deliver', protect, updateOrderToDelivered)
orderRouter.patch('/:id/approve', protect, admin, updateOrderToApproved)
orderRouter.patch('/:id/reject', protect, admin, updateOrderToRejected)
orderRouter.patch('/:id/pack', protect, admin, updateOrderToPacked)

export default orderRouter
