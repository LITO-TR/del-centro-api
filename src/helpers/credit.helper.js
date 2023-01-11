
const plusDate = (date, days) => {
  date.setDate(date.getDate() + days)
  const dateString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  return dateString
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

const getExpirationDay = (firstPayDate, numberOfPayments, paymentMethod) => {
  if (paymentMethod === 'day') {
    return plusDate(firstPayDate, numberOfPayments - 1)
  } else if (paymentMethod === 'week') {
    return plusDate(firstPayDate, (numberOfPayments * 7) - 7)
  }
}

const getPayments = (firstPayDate, numberOfPayments, paymentMethod, amountPay) => {
  const array = []
  if (paymentMethod === 'day') {
    plusDate(firstPayDate, -1)
    for (let index = 0; index < numberOfPayments; index++) {
      const result = plusDate(firstPayDate, 1)
      const obj = { nro: index + 1, date: result, payment: amountPay, isPaid: false, paymentDate: null, moraDays: 0 }
      array.push(obj)
    }
    return array
  } else if (paymentMethod === 'week') {
    plusDate(firstPayDate, -7)
    for (let index = 0; index < numberOfPayments; index++) {
      const result = plusDate(firstPayDate, 7)
      const obj = { nro: index + 1, date: result, paymentAmount: amountPay, isPaid: false, paymentDate: null, moraDays: 0 }
      array.push(obj)
    }
    return array
  }
}

const getDebt = (debt, paymentsAmount) => {
  return debt + paymentsAmount
}
module.exports = {
  getFirstDateByPaymentMethod,
  getExpirationDay,
  getPayments,
  plusDate,
  getDebt
}
