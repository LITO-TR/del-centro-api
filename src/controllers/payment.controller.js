const Credit = require('../models/credit.model')
const Payment = require('../models/payment.model')
const creditHelper = require('../helpers/credit.helper')

const paymentQuota = async (req, res) => {
  const { paymentId } = req.params

  const payment = await Payment.findById(paymentId)

  const credit = await Credit.findById(payment.creditId)
  const objPayment = {
    status: 'PAGADO',
    paymentDate: creditHelper.plusDate(new Date(), 0)
  }
  // TO-DO : DEBT
  // validar con pagos en validators
  let objCredit = {}
  if (payment.status === 'PENDIENTE') {
    objCredit = {
      debtAmount: credit.debtAmount - credit.paymentsAmount
    }
  } else if (payment.status === 'PAGADO') {
    objCredit = {
      debtAmount: credit.debtAmount
    }
  }

  try {
    await Payment.updateOne({ _id: paymentId }, objPayment)
    await Credit.updateOne({ _id: payment.creditId }, objCredit)
    // const payment = await Payment.findById(paymentId)
    const payments = await Payment.find({ creditId: payment.creditId })
    res.status(200).json(
      payments
    )
  } catch (error) {
    res.status(400).json(
      { msg: error }
    )
  }
}

const getPaymentsByDate = async (req, res) => { // segun la fecha?
  const { day, month, year } = req.params
  try {
    const payments = await Payment.find({ date: year + '/' + month + '/' + day })
    res.status(200).json(
      payments
    )
  } catch (error) {
    res.status(400).json(
      error
    )
  }
}

module.exports = {
  paymentQuota,
  getPaymentsByDate
}
