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

socket.on('userCheckin', user => {
  const square = document.querySelector(`.square-${user.bikePos}`)
  console.log(`.square-${user.bikePos}`)

  if (square) {
    square
      .querySelector('.header__picture')
      .setAttribute('src', user.pictureUrl)
    square.querySelector('.header__name').innerText = user.name
  }
})

socket.on('bikeUpdated', bike => {
  // 1 - potência 2-rpm

  const classType = 1 // TODO: buscar esse dado da api
  console.log({ bike })

  const bikeElem = document.querySelector(`.square-${bike.bikePos}`)

  if (!bikeElem) return undefined

  if (classType == 1) changeSquareColor(bike.march, bikeElem)

  bikeElem.querySelector('.featured').innerText =
    classType == 1 ? bike.march : bike.rpm
  bikeElem.querySelector('.rpm').innerText = bike.rpm
  bikeElem.querySelector('.march').innerText = bike.march
  bikeElem.querySelector('.kcal').innerText = bike.kcal
  bikeElem.querySelector('.potency').innerText = bike.watts
})

function changeSquareColor(rpm, square) {
  let color = 'gray'
  const blue = 'rgb(2, 84, 151)'
  const green = ' rgb(41, 172, 9)'
  const yellow = 'rgb(191, 189, 36)'
  const red = 'rgb(201, 19, 19)'

  if (rpm >= 6 && rpm <= 9) color = blue
  else if (rpm >= 10 && rpm <= 14) color = green
  else if (rpm >= 15 && rpm <= 18) color = yellow
  else if (rpm >= 19) color = red

  square.style.backgroundColor = color
}
