const Payment = require('../models/payment.model')

const createPayments = async (req, res) => {
  const { creditId, numberOfPayments } = req.params
  console.log('entre')
  try {
    const payment = await Payment.insertMany([{ payment: 15 }, { payment: 10 }])
    console.log(payment)
    res.status(200).json(
      payment
    )
  } catch (error) {
    res.status(200).json(
      error
    )
  }
}

module.exports = {
  createPayments
}
