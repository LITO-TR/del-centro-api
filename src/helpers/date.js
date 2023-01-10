
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
const test = (firstPayDate) => {
  for (let i = firstPayDate; i <= plusDate(firstPayDate, 10); i = plusDate(firstPayDate, i)) {
    console.log(i)
  }
}

const date = new Date()

test(date)
