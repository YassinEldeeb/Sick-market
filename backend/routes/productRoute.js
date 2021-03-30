import express from "express"
import {
  getProducts,
  getProduct,
  deleteProduct,
  addProduct,
  updateProduct,
  upload,
} from "../controllers/productsController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.get("/:id", getProduct)
productRouter.delete("/:id", protect, admin, deleteProduct)
productRouter.post("/", protect, admin, upload.single("upload"), addProduct)
productRouter.patch(
  "/:id",
  protect,
  admin,
  upload.single("upload"),
  updateProduct
)

export default productRouter
