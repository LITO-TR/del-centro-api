
// milliseconds
const plusDate = (date, days) => {
  date.setDate(date.getDate() + days)
  return date
}

const getFirstDateByPaymentMethod = (paymentMethod) => {
  const date = new Date()

  if (paymentMethod === 'day') {
    return plusDate(date, 1)
  } else if (paymentMethod === 'week') {
    return plusDate(date, 7)
  }
}
const date = new Date()
console.log(date.getDay())
console.log(getFirstDateByPaymentMethod('day'), 'first day pay')
