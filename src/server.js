//server
const express = require('express')
const path = require('path')
const http = require('http')
// routes
const routes = require('./routes')
// app
const app = express()

// configs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

const server = http.createServer(app)
const port = process.env.PORT || 3333

// attach socketio to server
require('./services/socketio').attach(server)

// firebase
require('./services/firebase')

server.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`)
})
