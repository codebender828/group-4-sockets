const socketIO = require('socket.io')
const server = require('./index')

const io = socketIO(server)

let broadcaster

io.on('error', err => console.log(err))
io.on('connection', (socket) => {
  socket.on('broadcaster', () => {
    broadcaster = socket.id
    socket.broadcast.emit('broadcaster')
  })
  socket.on('watcher', () => {
    broadcaster && socket.to(broadcaster).emit('watcher', socket.id)
  })
  socket.on('offer', (id /* of the watcher */, message) => {
    socket.to(id).emit('offer', socket.id /* of the broadcaster */, message)
  })
  socket.on('answer', (id /* of the broadcaster */, message) => {
    socket.to(id).emit('answer', socket.id /* of the watcher */, message)
  })
  socket.on('candidate', (id, message) => {
    socket.to(id).emit('candidate', socket.id, message)
  })
  socket.on('disconnect', () => {
    broadcaster && socket.to(broadcaster).emit('bye', socket.id)
  })
})
