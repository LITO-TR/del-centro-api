const helper = require('../helpers/credit.helper')
// milliseconds
/* const plusDate = (date, days) => {
  date.setDate(date.getDate() + days)

  const dateString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  console.log(date.getDay())
  return dateString
} */

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

/* const date = new Date() // '2023/01/10'
// console.log(date, 'now')
// console.log(date.getDate(), 'date')
console.log(helper.getQuotas(date, 5, 'week', 10))
// console.log(plusDate(date, 2))
// const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
// console.log(dateString)
*/
/* const decimal = '6.98123'
const dec = 6.955
console.log(dec.toFixed(2), 'toFidex')

const y = decimal.split('.')
const firstPart = y[0]
const decimals = y[1]
const three = decimals.slice(0, 3)
let rounding = ''
console.log(three, '-> tres decimales')
console.log(three[0], 'sd')
console.log(three[1], 'sd')

if (three[0] === 9 && three[2] >= 5 && three[1] >= 5) {
  rounding = '00'
  console.log(firstPart + 1, 'holaa')
} else if (three[2] >= 5) {
  rounding = (parseFloat(three[0] + three[1]) + 1).toString()
  console.log(rounding, '-> redondeo')
} else if (three[2] < 5) {
  console.log(parseFloat(three[0] + three[1]))
  rounding = (parseFloat(three[0] + three[1])).toString()
}

const join = firstPart + '.' + rounding
console.log(join, '-> numero final') */
const URL = 'https://codember.dev/users.txt'
// const getData = async (URL) => {

const responseAPI = async (url) => {
  const response = await fetch(url)
  if (!response.ok) { throw new Error('WARN', response.status) }
  const data = await response.text()
  return data
}
async function main () {
  const ok = await responseAPI(URL)

  // console.log(ok)

  // console.log(ok[1])
  ok.split('n')
  // console.log(ok, 'aasdasdas')
  for (let i = 0; i < 50; i++) {
    // console.log(i + 'aaaaa:', ok[i])
    if (ok[i] === ' ') {
      console.log(i)
      for (let j = i; j >= 0; j--) {
        console.log(j)
      }
      // console.log('aea')
    }
  }
}

main()
