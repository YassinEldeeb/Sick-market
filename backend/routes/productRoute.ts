import express from 'express'
import {
  getProducts,
  getProduct,
  deleteProduct,
  addProduct,
  updateProduct,
  upload,
  searchProductsSuggesstions,
  searchProducts,
  getTinyProductImage,
  resizeProductImage,
  checkProducts,
} from '../controllers/productsController'
import { protect, admin } from '../middleware/authMiddleware'

const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.get('/suggest', searchProductsSuggesstions)
productRouter.post('/check', checkProducts)
productRouter.get('/search', searchProducts)
productRouter.get('/:id', getProduct)
productRouter.delete('/:id', protect, admin, deleteProduct)
productRouter.post('/', protect, admin, upload.single('upload'), addProduct)
productRouter.get('/:id/tiny', getTinyProductImage)
productRouter.get('/:id/image', resizeProductImage)
productRouter.patch(
  '/:id',
  protect,
  admin,
  upload.single('upload'),
  updateProduct
)

export default productRouter
