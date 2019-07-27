var path = require('path')
const morgan = require('morgan')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(`${__dirname}/data/db.json`)
const db = low(adapter)
const defaultData = require('./data/default-data.json')
db.defaults(defaultData).write()

/**
 * SERVER
 */
const http = require('http')
const express = require('express')

const app = express()
app.io = require('socket.io')()

const io = app.io

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

/* Routes */
app.get('/', (req, res) => {
  const bikes = db.get('bikes').value()

  res.render('index', { bikes })
})

app.post('/bike', (req, res) => {
  const payload = req.body

  db.set(`bikes[${payload.serial}]`, payload).write()

  io.emit('bike', payload)
  res.send(payload)
})

const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port)
io.attach(server)

io.on('connect', socket => {
  console.log('new client connected')
})

server.on('listening', () => {
  console.log(`Server started on port ${port}`)
})
