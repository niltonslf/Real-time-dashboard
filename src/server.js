//server
const Firestore = require('./services/Firestore')
const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

io.on('connect', socket => console.log('new client connected'))

// Firestore
new Firestore({ io }).listenChanges()

// routes
const routes = require('./routes')

// configs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

// const server = http.createServer(app)

const port = process.env.PORT || 3333
server.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`)
})
