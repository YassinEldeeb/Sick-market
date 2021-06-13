import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { instrument } from '@socket.io/admin-ui'

dotenv.config()

class SocketService {
  io: any
  socket: any

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: [
          'http://localhost:3000',
          'https://sickmarket.ml',
          'https://admin.socket.io',
        ],
      },
      transports:
        process.env.NODE_ENV === 'development'
          ? ['websocket', 'polling']
          : ['websocket'],
    })

    this.io.on('connection', (socket: any) => {
      this.socket = socket
      socket.on('userSignedIn', (id: any) => {
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
    instrument(this.io, {
      auth: false,
    })
  }
  emiter(event: any, body: any, room: any) {
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
