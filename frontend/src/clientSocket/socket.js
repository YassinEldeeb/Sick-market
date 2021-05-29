import { io } from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const socket = io(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://sickmarket.ml'
)

export default socket
