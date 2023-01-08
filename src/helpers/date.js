
// milliseconds
const getFirstDateByPaymentMethod = (paymentMethod) => {
  const date = new Date()
  // milliseconds

  const DAY = 86400000
  const WEEK = 604800000
  const TIME_NOW = clearTime(date).getTime()
  console.log(TIME_NOW)
  if (paymentMethod === 'day') {
    return new Date(TIME_NOW + DAY)
  } else if (paymentMethod === 'week') {
    return new Date(TIME_NOW + WEEK).toLocaleDateString()
  }
}
const clearTime = (date) => {
  const dateChanged = new Date(date.toLocaleDateString())
  return dateChanged
}

console.log(getFirstDateByPaymentMethod('day'), 'first day pay')
