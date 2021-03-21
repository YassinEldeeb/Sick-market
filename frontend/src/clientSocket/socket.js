import { io } from "socket.io-client"
import dotenv from "dotenv"
dotenv.config()

const socket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://sick-market.herokuapp.com"
)

export default socket
