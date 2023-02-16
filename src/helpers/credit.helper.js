
const plusDate = (date, days) => {
  date.setDate(date.getDate() + days)
  const dateString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  // console.log(dateString)
  return dateString
}

const getFirstDateByPaymentMethod = (paymentMethod) => {
  const date = new Date()
  const day = date.getDay()
  if (paymentMethod === 'day') {
    if (day === 1 || day === 2 || day === 3 || day === 4) {
      return plusDate(date, 2)
    } else if (day === 0 || day === 5 || day === 6) { // viernes sabado domingo
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

const getPayments = (firstPayDate, numberOfPayments, paymentMethod, amountPay, id) => {
  const array = []
  if (paymentMethod === 'day') {
    plusDate(firstPayDate, -1)
    for (let index = 0; index < numberOfPayments; index++) {
      if (firstPayDate.getDay() === 6) {
        const result = plusDate(firstPayDate, 2)
        const obj = { paymentOrder: index + 1, date: result, payment: amountPay, status: 'PENDIENTE', paymentDate: '', customerPayment: 0, paymentMethod: '', moraDays: 0, creditId: id }
        array.push(obj)
      } else {
        const result = plusDate(firstPayDate, 1)
        const obj = { paymentOrder: index + 1, date: result, payment: amountPay, status: 'PENDIENTE', paymentDate: '', customerPayment: 0, paymentMethod: '', moraDays: 0, creditId: id }
        array.push(obj)
      }
    }
    return array
  } else if (paymentMethod === 'week') {
    plusDate(firstPayDate, -7)
    for (let index = 0; index < numberOfPayments; index++) {
      const result = plusDate(firstPayDate, 7)
      const obj = { paymentOrder: index + 1, date: result, payment: amountPay, status: 'PENDIENTE', paymentDate: '', customerPayment: 0, paymentMethod: '', moraDays: 0, creditId: id }
      array.push(obj)
    }
    return array
  }
}

const getDebt = (creditAmount, paymentsArray) => {
  console.log(paymentsArray)
  let suma = 0
  for (let i = 0; i < paymentsArray.length; i++) {
    suma += paymentsArray[i]
    console.log(i, paymentsArray[i])
  }
  console.log(suma)
  console.log(paymentsArray)
  return creditAmount - suma
}
module.exports = {
  getFirstDateByPaymentMethod,
  getExpirationDay,
  getPayments,
  plusDate,
  getDebt
}
