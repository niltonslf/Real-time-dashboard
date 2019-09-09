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
  const hasUser = document.querySelector(`.bike${user.id}`)

  if (!hasUser) {
    document.querySelector('#users__container').innerHTML += `
    <article class="user bike${user.hash}" id="user${user.id}">
      <header class="user__header">
          <img src="${user.pictureUrl}" alt="${user.name}" class="header__picture">
          <div class="header__name">${user.name}</div>
          <div class="header__bike">${user.bike}</div>
      </header>
      <div class="user__performance">
          100%
      </div>
      <footer class="user__footer">
        <div class="footer__info">
            <span>000</span>
            <span class="info__label">rpm</span>
        </div>
        <div class="footer__info">
            <span>000</span>
            <span class="info__label">kcal</span>
        </div>
        <div class="footer__info">
            <span>000</span>
            <span class="info__label">força</span>
        </div>
      </footer>
    </article>
  `
  }
})

socket.on('bike', bike => {
  const bikeElem = document.querySelector(`.bike${bike.hash}`)

  bikeElem.querySelector('.featured').innerText = bike.rpm
  bikeElem.querySelector('.rpm').innerText = bike.rpm
  bikeElem.querySelector('.march').innerText = bike.march
  bikeElem.querySelector('.kcal').innerText = bike.rpm
  bikeElem.querySelector('.potency').innerText = bike.rpm
})
