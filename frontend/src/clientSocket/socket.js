import { io } from 'socket.io-client'

const socket = io('ws://5.5.5.5:4000', {
  transports: ['websocket'],
  secure: true,
})

export default socket
