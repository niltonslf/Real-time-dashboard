const fetch = require('node-fetch')

/**
 * Prepara corpo da requisição
 * @param {*} serial
 * @param {*} speed
 */
function makeRequest(marcha, rpm, hash) {
  fetch('http://localhost:3333/bike', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({ marcha, rpm, hash })
  })
}

/**
 * Realiza requisição
 */
setInterval(function() {
  for (let i = 1; i <= 30; i++) {
    makeRequest(
      Math.ceil(Math.random() * 24),
      Math.ceil(Math.random() * 200),
      `${i}`.padStart(2, 0)
    )
    console.log(`🚴\t Request realizado`)
  }
}, 1000)
