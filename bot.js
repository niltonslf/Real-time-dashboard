const fetch = require('node-fetch')

function makeRequest(serial, speed) {
  fetch('http://localhost:3000/bike', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({
      serial: serial,
      marcha: speed * 2,
      somatorio_de_voltas: speed,
      date_time: 'data'
    })
  })
}

setInterval(function() {
  makeRequest(1, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(2, Math.round(Math.random() * 100))
}, 1000)

setInterval(function() {
  makeRequest(3, Math.round(Math.random() * 100))
}, 1000)

setInterval(function() {
  makeRequest(4, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(5, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(6, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(7, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(8, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(9, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(10, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(11, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(12, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(13, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(14, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(15, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(16, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(17, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(18, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(19, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(20, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(21, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(22, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(23, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(24, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(25, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(26, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(27, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(28, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(29, Math.round(Math.random() * 100))
}, 1000)
setInterval(function() {
  makeRequest(30, Math.round(Math.random() * 100))
}, 1000)
console.log(`🚴\t Request realizado`)
