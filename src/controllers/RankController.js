const db = require('../services/db')
const ApiService = require('../services/ApiService')

function index(req, res) {
  const teacher = db.get('teacher').value()
  const screenOpened = req.query.screen
  const position = {
    label: screenOpened === 'left' ? 'E' : 'D'
  }

  const resultList = []

  const users = db
    .get('users')
    .value()
    .filter(user => user != null)

  users.forEach(user => {
    const performance = user.performance
    const length = performance.length || 0

    const summation = calcSummation(performance)
    const userAverage = calcAverage(summation, length)

    resultList.push({ user: user.id, ...userAverage })
  })

  postDataToApi(resultList)

  res.render('rank.ejs', { position, teacher, resultList })
}

function calcSummation(performance) {
  if (!performance.length) return { march: 0, rpm: 0, kcal: 0, watts: 0 }

  return performance.reduce((prev, next) => {
    return {
      march: prev.march + next.march,
      rpm: prev.rpm + next.rpm,
      kcal: prev.kcal + next.kcal,
      watts: prev.watts + next.watts
    }
  })
}

function calcAverage(summation, length) {
  let isAllKeysNulled = 0
  for (const key in summation) isAllKeysNulled += summation[key]

  if (!isAllKeysNulled) return { march: 0, rpm: 0, kcal: 0, watts: 0 }

  const rpm = summation.rpm / length
  const march = summation.march / length

  const { kcal, watts } = summation
  return { march, rpm, watts, kcal }
}

function postDataToApi(data) {
  const remainingItems = data

  remainingItems.map(item => {
    ApiService.postUserResult({
      class_id: 1,
      rpm: 50,
      power: 50,
      kcal: 50,
      distance: 50,
      user_id: 1
    })
    // .then(res => {
    //   // console.log({ res })
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.error('Error:', err.message)
    // })

    // Modelo de dados
    // class_id: 1
    // rpm: 50
    // power: 50
    // kcal: 50
    // distance: 50
    // user_id: 1
  })

  setInterval(() => {}, 1000)
}

module.exports = index
