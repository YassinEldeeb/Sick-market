import { io } from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

console.log(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://sickmarket.ml/connectSocket'
)
const socket = io(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://sickmarket.ml/connectSocket',
  { transports: ['websocket'], upgrade: false }
)

export default socket
