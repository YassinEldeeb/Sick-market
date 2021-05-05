import { io } from 'socket.io-client'

const socket = io('https://sickmarket.ml', {
  transports: ['websocket'],
})

export default socket
