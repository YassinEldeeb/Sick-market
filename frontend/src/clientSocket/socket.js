import { io } from 'socket.io-client'

const socket = io('http://3.22.112.164', {
  transports: ['websocket'],
  secure: true,
})

export default socket
