import { io } from 'socket.io-client'

const socket = io({
  transports: ['polling', 'websocket'],
})

export default socket
