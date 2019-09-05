const socketIo = require('socket.io')()

socketIo.on('connect', socket => {
  console.log('new client connected')
})

module.exports = socketIo
