const admin = require('firebase-admin')
const serviceAccount = require('../ServiceAccountKey.json')

class Firestore {
  constructor(dependecies) {
    const { io } = dependecies
    this.io = io
    this.db = this.__initializeApp()
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
    const franchise = this.db.collection(`/franchise/${franchiseID}/classes`)

    franchise.onSnapshot(doc => {
      console.log('document update')
      doc.forEach(doc => {
        const obj = doc.data()
        // emitir statu da aula
        this.io.emit('classListener', { status: obj.status })
      })
    })
  }
}
module.exports = Firestore
