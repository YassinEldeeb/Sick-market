import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

class SocketService {
  constructor(server) {
    if (process.env.NODE_ENV === 'development') {
      this.io = new Server(server, {
        maxHttpBufferSize: 1024, // max message payload size (prevents clients from sending gigabytes of data)
        pingInterval: 60 * 1000, // 1 minute
        pingTimeout: 4 * 60 * 1000, // 4 minutes
      })
    } else {
      this.io = new Server(server, {
        maxHttpBufferSize: 1024, // max message payload size (prevents clients from sending gigabytes of data)
        pingInterval: 60 * 1000, // 1 minute
        pingTimeout: 4 * 60 * 1000, // 4 minutes
      })
    }
    this.io.on('connection', (socket) => {
      this.socket = socket
      socket.on('userSignedIn', (id) => {
        if (id) {
          const roomId = `user:${id}`
          socket.join(roomId)
          console.log('RoomID:', roomId)
        }
      })
      socket.on('adminJoined', () => {
        const roomId = `Admins`
        socket.join(roomId)
      })

      socket.on('disconnect', () => {
        console.log('User has Disconnected 😟')
        socket.removeAllListeners()
      })
    })
  }
  emiter(event, body, room) {
    if (!room) {
      if (body) this.io.emit(event, body)
      else this.io.emit(event)
    } else {
      if (body) this.io.to(room).emit(event, body)
      else this.io.to(room).emit(event)
    }
  }
}

export default SocketService
