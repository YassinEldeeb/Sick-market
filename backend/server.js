import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/mongoose.js"
import colors from "colors"
import productRouter from "./routes/productRoute.js"
import { errRouter, notFoundRouter } from "./middleware/errMiddleware.js"
import userRouter from "./routes/userRoute.js"
import orderRouter from "./routes/orderRoute.js"
import bodyparser from "body-parser"
import rateLimit from "express-rate-limit"
import path from "path"

const app = express()
app.use(express.json())
dotenv.config()

connectDB()
app.use(bodyparser.urlencoded({ extended: true }))

app.use("/api/products", productRouter)

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 1,
  message: { message: "Try again in 60 seconds" },
})

app.use("/api/users/getNewSecurityCode", apiLimiter)

app.use("/api/users", userRouter)

app.use("/api/orders", orderRouter)

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("The API is running!")
  })
}

app.use(notFoundRouter)
app.use(errRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
})
