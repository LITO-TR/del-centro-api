const getFirstDateByPaymentMethod = (paymentMethod) => {
  const date = new Date()
  // milliseconds
  const TIME_NOW = Date.now()

  const DAY = 86400000
  const WEEK = 604800000
  clearTime(date)
  if (paymentMethod === 'day') {
    return new Date(TIME_NOW + DAY)
  } else if (paymentMethod === 'week') {
    return new Date(TIME_NOW + WEEK)
  }
}
const clearTime = (date) => {
  const dateChanged = new Date(date.toLocaleDateString())
  return dateChanged
}

module.exports = {
  getFirstDateByPaymentMethod
}
