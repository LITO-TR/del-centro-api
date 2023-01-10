const helper = require('../helpers/credit.helper')
// milliseconds
const plusDate = (date, days) => {
  date.setDate(date.getDate() + days)

  const dateString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  console.log(date.getDay())
  return dateString
}

/* const getFirstDateByPaymentMethod = (paymentMethod) => {
  const date = new Date()

  if (paymentMethod === 'day') {
    return plusDate(date, 1)
  } else if (paymentMethod === 'week') {
    return plusDate(date, 7)
  }
}
const test = (firstPayDate) => {
  for (let i = firstPayDate; i <= plusDate(firstPayDate, 10); i = plusDate(firstPayDate, i)) {
    console.log(i)
  }
} */

const date = new Date() // '2023/01/10'
// console.log(date, 'now')
// console.log(date.getDate(), 'date')
console.log(helper.getQuotas(date, 5, 'week', 10))
// console.log(plusDate(date, 2))
// const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
// console.log(dateString)
