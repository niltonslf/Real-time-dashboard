const fetch = require('node-fetch')
const Bluebird = require('bluebird')
fetch.Promise = Bluebird

class ApiService {
  constructor() {
    this.apiUrl = 'https://www.gocycle.com.br/plataforma/public/api'
  }
  fetchUser(id) {
    const user = fetch(`${this.apiUrl}/userscreen/user/1/classes/1`)
      .then(res => res.json())
      .then(user => this.__parseUserData(user))
    return user
  }

  __parseUserData(user) {
    return {
      id: undefined,
      name: user.name,
      bike: user.bike_position,
      class: undefined,
      date: new Date(),
      time: '00:00',
      pictureUrl: user.picture_url,
      performance: []
    }
  }
}

module.exports = new ApiService()
