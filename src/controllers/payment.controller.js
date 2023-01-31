const Credit = require('../models/credit.model')
const Payment = require('../models/payment.model')
const creditHelper = require('../helpers/credit.helper')

const paymentQuota = async (req, res) => {
  const { paymentId, method, customerPayment } = req.params

  const payment = await Payment.findById(paymentId)

  const credit = await Credit.findById(payment.creditId)

  let objPayment = {}
  let objCredit = {}

  if (payment.status === 'PENDIENTE') {
    objPayment = {
      status: 'PAGADO',
      paymentDate: creditHelper.plusDate(new Date(), 0),
      paymentMethod: method,
      customerPayment
    }
    objCredit = {
      debtAmount: parseFloat((credit.debtAmount - credit.paymentsAmount).toFixed(2))
    }
  } else if (payment.status === 'PAGADO') {
    objCredit = {
      debtAmount: credit.debtAmount
    }
    objPayment = {
      paymentDate: payment.paymentDate
    }
  }

  try {
    await Payment.updateOne({ _id: paymentId }, objPayment)
    const payments = await Payment.find({ creditId: credit.id })
    const paymentCont = payments.filter(obj => obj.status === 'PAGADO')
    console.log(paymentCont.length)
    if (paymentCont.length === credit.numberOfPayments) {
      objCredit.creditStatus = 'finalizado'
      console.log('aver', objCredit.creditStatus)
    }
    await Credit.updateOne({ _id: payment.creditId }, objCredit)
    const paymentPaid = await Payment.findById(paymentId)
    // const payments = await Payment.find({ creditId: payment.creditId })
    res.status(200).json(
      paymentPaid
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
