import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/mongoose.js"
import colors from "colors"
import productRouter from "./routes/productRoute.js"
import { errRouter, notFoundRouter } from "./middleware/errMiddleware.js"
import userRouter from "./routes/userRoute.js"
import orderRouter from "./routes/orderRoute.js"
import couponRouter from "./routes/couponRoute.js"
import bodyparser from "body-parser"
import rateLimit from "express-rate-limit"
import path from "path"
import cache from "./middleware/cacheMiddleware.js"
import sslRedirect from "heroku-ssl-redirect"
import spdy from "spdy"
import fs from "fs"

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

if (process.env.NODE_ENV === "production") {
  app.use(sslRedirect())
}

app.use(bodyparser.urlencoded({ extended: true }))

app.use("/api/products", productRouter)

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 1,
  message: { message: "Try again in 60 seconds" },
})
app.use(cache)

app.use("/api/users/getNewSecurityCode", apiLimiter)

app.use("/api/users", userRouter)

app.use("/api/orders", orderRouter)

app.use("/api/coupons", couponRouter)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

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

// spdy
//   .createServer(
//     {
//       key: fs.readFileSync("./ssl/server.key"),
//       cert: fs.readFileSync("./server.crt"),
//     },
//     app
//   )
//   .listen(port, (err) => {
//     if (err) {
//       throw new Error(err)
//     }
//     console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
//         .bold
//     )
//   })
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
})
