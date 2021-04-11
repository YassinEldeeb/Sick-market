import { Server } from 'socket.io'

class SocketService {
  constructor(server) {
    this.io = new Server(server)
    this.io.on('connection', (socket) => {
      socket.on('LogoutAllUsers', () => {
        socket.broadcast.emit('logoutMe')
      })
    })
  }

  emiter(event, body) {
    if (body) this.io.emit(event, body)
    else this.io.emit(event)
  }
}

export default SocketService
