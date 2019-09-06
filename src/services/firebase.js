const admin = require('firebase-admin')
const serviceAccount = require('../ServiceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gocycle-47626.firebaseio.com'
})

const db = admin.firestore()

const franchiseID = 1
const franchise = db.collection(`/franchise/${franchiseID}/classes`)

franchise.onSnapshot(doc => {
  console.log('document update')
  doc.forEach(doc => {
    if (doc.id !== 1) return false

    const obj = doc.data()
    if (obj.status == 1) {
      console.log('inicia aula')
    }
  })
})
