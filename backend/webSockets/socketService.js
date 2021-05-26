import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'

dotenv.config()

class SocketService {
  constructor(server) {
    this.io = new Server(server)
    // this.pubClient = new createClient(6379, 'localhost')
    // const subClient = pubClient.duplicate()
    // this.io.adapter(createAdapter(pubClient, subClient))

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
