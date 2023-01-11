const Credit = require('../models/credit.model')
const Payment = require('../models/payment.model')

const creditHelper = require('../helpers/credit.helper')
const createCredit = async (req, res) => {
  const creditData = req.body

  creditData.creditType = 'NUEVO CREDITO'
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount

  creditData.firstPayDate = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.discount = 0.0
  creditData.expirationDate = creditHelper.getExpirationDay(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod)
  creditData.currentDate = creditHelper.plusDate(new Date(), 0)
  creditData.disbursedAmount = creditData.creditAmount
  creditData.paymentsAmount = creditData.totalAmount / creditData.numberOfPayments
  // creditData.payments = creditHelper.getPayments(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod, creditData.paymentsAmount)
  creditData.debtAmount = 0.0

  try {
    const credit = await Credit.create(req.body)
    await Payment.insertMany(creditHelper.getPayments(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod, creditData.paymentsAmount, credit._id))

    res.status(200).json(
      credit
    )
  } catch (error) {
    res.status(400).json({
      msg: error
    })
  }
}

const createCreditExtension = async (req, res) => {
  // const { id } = req.params
  // const previousCredit = await Credit.findById(id)
  const creditData = req.body
  creditData.creditType = 'AMPLIACION'
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount
  creditData.firstPayDay = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.expirationDate = creditHelper.getExpirationDay(creditData.firstPayDay, creditData.numberOfPayments, creditData.paymentMethod)

  creditData.disbursedAmount = creditData.creditAmount - creditData.discount
  try {
    const creditExtension = await Credit.create(req.body)
    res.status(200).json(
      creditExtension
    )
  } catch (error) {
    res.status(400).json({
      msg: error
    })
  }
}

const paymentQuota = async (req, res) => {
  const { creditId, paymentId } = req.params
  const credit = await Credit.findById(creditId)
  const objPayment = {
    status: 'PAGADO',
    paymentDate: creditHelper.plusDate(new Date(), 0)
  }
  // TO-DO : DEBT
  const payments = []
  payments.push(credit.paymentsAmount)
  const objCredit = {
    debtAmount: creditHelper.getDebt(credit.creditAmount, payments)
  }
  try {
    const payment = await Payment.updateOne({ _id: paymentId }, objPayment)
    const updatedCredit = await Credit.updateOne({ _id: creditId }, objCredit)

    res.status(200).json({
      updatedCredit,
      payment
    }
    )
  } catch (error) {
    res.status(400).json(
      { msg: error }
    )
  }
}

module.exports = {
  createCredit,
  createCreditExtension,
  paymentQuota
}
