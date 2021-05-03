import { io } from 'socket.io-client'

const socket = io({ transports: ['websocket'], secure: true })

export default socket
