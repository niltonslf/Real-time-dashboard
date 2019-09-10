const clock = document.querySelector('.clock')

let classDate = new Date()

setInterval(() => {
  classDate.setSeconds(10)
  console.log(classDate.toTimeString())
}, 1000)
