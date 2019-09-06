const admin = require('firebase-admin')
const serviceAccount = require('../ServiceAccountKey.json')
const ApiService = require('./ApiService')
const lowDB = require('./db')

class Firestore {
  constructor(dependecies) {
    const { io } = dependecies
    this.io = io
    this.db = this.__initializeApp()
    this.lowDB = lowDB
  }

  __initializeApp() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://gocycle-47626.firebaseio.com'
    })
    // retorna acesso ao 'banco'
    return admin.firestore()
  }

  listenChanges() {
    const franchiseID = 1

    this.__listenClasses(franchiseID)
    this.__listenUsers(franchiseID, 1)
  }
  /**
   * Listen changes classes collection
   */
  __listenClasses(franchiseID) {
    const franchiseCollection = this.db.collection(
      `/franchise/${franchiseID}/classes`
    )

    franchiseCollection.onSnapshot(doc => {
      console.log('document update')
      doc.forEach(doc => {
        const obj = doc.data()
        // emitir status da aula
        this.io.emit('classListener', { status: obj.status })
      })
    })
  }

  /**
   * Listen if a new user was added
   */
  async __listenUsers(franchiseID, classID) {
    const usersCollection = await this.db.collection(
      `/franchise/${franchiseID}/classes/${classID}/users`
    )

    usersCollection.onSnapshot(users => {
      users.forEach(doc => {
        ApiService.fetchUser(doc.id).then(user => {
          user.id = doc.id
          console.log(user.id, '\n-------')
          const users = this.lowDB.set(`users[${user.id}]`, user).write()
          // emitir para os sockets que há um novo usuário
          this.io.emit('user', user)
        })
      })
    })
  }
}
module.exports = Firestore
