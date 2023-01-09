
const plusDate = (date, days) => {
  date.setDate(date.getDate() + days)
  return date
}

const getFirstDateByPaymentMethod = (paymentMethod) => {
  const date = new Date()
  const day = date.getDay()
  if (paymentMethod === 'day') {
    if (day === 1 || day === 2 || day === 4) {
      return plusDate(date, 2)
    } else if (day === 0 || day === 5 || day === 6) {
      return plusDate(date, 1)
    }
  } else if (paymentMethod === 'week') {
    return plusDate(date, 7)
  }
}

const getExpirationDay = (firstPayDate, numberOfQuotas, paymentMethod) => {
  if (paymentMethod === 'day') {
    return plusDate(firstPayDate, numberOfQuotas)
  } else if (paymentMethod === 'week') {
    return plusDate(firstPayDate, numberOfQuotas * 7)
  }
}
module.exports = {
  getFirstDateByPaymentMethod,
  getExpirationDay
}
