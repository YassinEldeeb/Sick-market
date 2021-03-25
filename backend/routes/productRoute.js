import express from "express"
import {
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productsController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.get("/:id", getProduct)
productRouter.delete("/:id", protect, admin, deleteProduct)

export default productRouter
