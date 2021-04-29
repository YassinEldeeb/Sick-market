import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

orderRouter.post('/', protect, addOrderItems)
orderRouter.get('/myOrders', protect, getMyOrders)
orderRouter.get('/allOrders', protect, admin, getAllOrders)
orderRouter.get('/:id', protect, getOrderById)
orderRouter.patch('/:id/pay', protect, updateOrderToPaid)
orderRouter.patch('/:id/deliver', protect, updateOrderToDelivered)

export default orderRouter
