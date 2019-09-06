const socket = io()

socket.on('connect', () => {
  console.log('connected on socket')
})
socket.on('classListener', payload => {
  console.log('status recebido', payload)

  if (payload.status == 1) window.location = '/dashboard'
  if (payload.status == 2) window.location = '/rank'
  if (payload.status == 0) window.location = '/'
})
socket.on('bike', bike => {
  const bikeElem = document.querySelector(`#bike${bike.serial}`)
  bikeElem.querySelector('.marcha').innerText = bike.marcha
  bikeElem.querySelector('.speed').innerText = bike.somatorio_de_voltas
})
