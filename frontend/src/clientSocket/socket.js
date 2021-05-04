import { io } from 'socket.io-client'

const socket = io('wss://sickmarket.ml', {
  transports: ['websocket'],
  secure: true,
})

export default socket
