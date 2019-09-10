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
    this.__fetchTeacher(franchiseID, 1)
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
        ApiService.fetchUser(doc.id, 1).then(user => {
          user.id = doc.id
          this.lowDB.set(`users[${user.id}]`, user).write()
          // emitir para os sockets que há um novo usuário
          this.io.emit('userCheckin', user)
        })
      })
    })
  }

  /**
   * Fetch teacher data from class and franchise
   * @param {*} franchiseID
   * @param {*} classID
   */
  __fetchTeacher(franchiseID, classID) {
    const teacherCollection = this.db.collection(
      `/franchise/${franchiseID}/classes/${classID}/teacher`
    )

    teacherCollection.get().then(res => {
      res.forEach(doc => {
        const teacherName = doc.data().name
        this.lowDB.set('teacher', teacherName).write()
      })
    })
  }

  /**
   * Limpar dados da collections de usuários
   */
  cleanUsers() {
    const usersCollection = this.db.collection(
      `/franchise/${franchiseID}/classes/${classID}`
    )
    usersCollection.doc('1').update({
      users: admin.firestore.FieldValue.arrayRemove('users')
    })
  }
}
module.exports = Firestore
