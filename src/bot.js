const fetch = require('node-fetch')

function makeRequest(serial, speed) {
  fetch('http://localhost:3333/bike', {
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
  for (let i = 1; i <= 30; i++) {
    makeRequest(i, Math.round(Math.random() * 100))
    console.log(`🚴\t Request realizado`)
  }
}, 1000)
