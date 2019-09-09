const socket = io()

socket.on('connect', () => {
  console.log('client connected on socket')
})
socket.on('classListener', user => {
  console.log('status recebido', user)

  if (user.status == 1) {
    window.location = '/dashboard'
  } else if (user.status == 2) {
    window.location = '/rank'
  } else window.location = '/'
})

socket.on('user', user => {
  // TODO: Alterar valores do quadro do usuário
})

socket.on('bike', bike => {
  const bikeElem = document.querySelector(`.bike${bike.hash}`)

  bikeElem.querySelector('.featured').innerText = bike.rpm
  bikeElem.querySelector('.rpm').innerText = bike.rpm
  bikeElem.querySelector('.march').innerText = bike.march
  bikeElem.querySelector('.kcal').innerText = bike.rpm
  bikeElem.querySelector('.potency').innerText = bike.rpm
})
