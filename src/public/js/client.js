const socket = io()

socket.on('connect', () => {
  console.info('client connected on socket')
})
socket.on('classListener', classObj => {
  const screenOpened = window.location.search

  if (classObj.status == 1) {
    window.location = `/dashboard${screenOpened}`
  } else if (classObj.status == 2) {
    window.location = `/rank${screenOpened}`
  } else window.location = `/${screenOpened}`
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
