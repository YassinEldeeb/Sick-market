import express from "express"
import { getProducts, getProduct } from "../controllers/productsController.js"

const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.get("/:id", getProduct)

export default productRouter
