const socket = io()

socket.on('connect', () => {
  console.log('connected on socket')
})
socket.on('classListener', payload => {
  console.log('status recebido', payload)

  if (payload.status == 1) {
    window.location = '/dashboard'
  } else if (payload.status == 2) {
    window.location = '/rank'
  } else window.location = '/'
})

socket.on('user', payload => {
  const hasUser = document.querySelector(`#bike${payload.id}`)

  if (!hasUser) {
    document.querySelector('#users__container').innerHTML += `
    <article class="user bike${payload.hash}" id="user${payload.id}">
      <header class="user__header">
          <img src="images/user.png" alt="Default user" class="header__picture">
          <div class="header__name">${payload.name}</div>
          <div class="header__bike">${payload.bike}</div>
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
  const bikeElem = document.querySelector(`#bike${bike.hash}`)

  bikeElem.querySelector('.user__performance').innerText = bike.rpm
  bikeElem.querySelector('.rpm').innerText = bike.rpm
  bikeElem.querySelector('.march').innerText = bike.march
  bikeElem.querySelector('.kcal').innerText = bike.rpm
  bikeElem.querySelector('.potency').innerText = bike.rpm
})
