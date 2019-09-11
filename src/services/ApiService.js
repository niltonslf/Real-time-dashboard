const fetch = require('node-fetch')
const Bluebird = require('bluebird')
fetch.Promise = Bluebird

class ApiService {
  constructor() {
    this.apiUrl = 'https://www.gocycle.com.br/plataforma/public/api'
  }
  fetchUser(userID, classID) {
    const user = fetch(
      `${this.apiUrl}/userscreen/user/${userID}/classes/${classID}`
    )
      .then(res => res.json())
      .then(user => this.__parseUserData(user, classID))
    return user
  }

  __parseUserData(user, userID, classID) {
    return {
      id: userID,
      name: user.name,
      bikePos: user.bike_position,
      class: classID,
      date: new Date(),
      hash: user.bike_hash,
      time: '00:00',
      pictureUrl: user.picture_url,
      performance: []
    }
  }
}

module.exports = new ApiService()
