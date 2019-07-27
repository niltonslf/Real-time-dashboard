const socket = io()
socket.on('connect', () => {
  console.log('connected')
})

socket.on('bike', bike => {
  console.log({ bike })

  const bikeElem = document.querySelector(`#bike${bike.serial}`)
  bikeElem.querySelector('.marcha').innerText = bike.marcha
  bikeElem.querySelector('.speed').innerText = bike.somatorio_de_voltas
})
