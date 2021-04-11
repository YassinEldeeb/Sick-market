import { Server } from 'socket.io'

class SocketService {
  constructor(server) {
    this.io = new Server(server)
    this.io.on('connection', (socket) => {
      socket.on('userSignedIn', (id) => {
        socket.join(`user: ${id}`)
        console.log('A User has signed In:', id)
      })
      socket.on('LogoutAllUsers', (id) => {
        socket.broadcast.to(`user: ${id}`).emit('logoutMe')
      })
    })
  }

  emiter(event, body) {
    if (body) this.io.emit(event, body)
    else this.io.emit(event)
  }
}

export default SocketService
