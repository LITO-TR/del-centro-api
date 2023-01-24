const Credit = require('../models/credit.model')
const Payment = require('../models/payment.model')

const creditHelper = require('../helpers/credit.helper')
const createCredit = async (req, res) => {
  const creditData = req.body

  creditData.creditType = 'NUEVO CREDITO'
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount
  creditData.firstPayDate = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.expirationDate = creditHelper.getExpirationDay(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod)
  creditData.currentDate = creditHelper.plusDate(new Date(), 0)
  creditData.disbursedAmount = creditData.creditAmount
  creditData.paymentsAmount = (creditData.totalAmount / creditData.numberOfPayments).toFixed(2)
  creditData.debtAmount = creditData.totalAmount
  creditData.creditStatus = 'en proceso'

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
  const { creditId } = req.params

  const credit = await Credit.findById(creditId)
  const creditData = req.body
  creditData.creditType = 'AMPLIACION'
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount
  creditData.debtAmount = credit.debtAmount
  creditData.firstPayDate = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.expirationDate = creditHelper.getExpirationDay(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod)
  creditData.currentDate = creditHelper.plusDate(new Date(), 0)
  creditData.paymentsAmount = creditData.totalAmount / creditData.numberOfPayments
  creditData.disbursedAmount = creditData.creditAmount - creditData.debtAmount

  try {
    const creditExtension = await Credit.create(req.body)
    await Payment.insertMany(creditHelper.getPayments(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod, creditData.paymentsAmount, creditExtension._id))
    const creditClose = await Credit.findOneAndUpdate({ _id: credit.id }, {
      debtAmount: 0,
      creditStatus: 'finalizado'
    })
    const paymentsClosed = await Payment.updateMany({ creditId: credit.id }, {
      status: 'PAGADO',
      paymentDate: creditHelper.plusDate(new Date(), 0)

    })
    res.status(200).json(
      creditExtension,
      creditClose,
      paymentsClosed
    )
  } catch (error) {
    res.status(400).json({
      msg: error
    })
  }
}

const getAllCredits = async (req, res) => {
  try {
    const credits = await Credit.find()
    res.status(200).json(
      credits
    )
  } catch (error) {
    res.status(400).json(
      error
    )
  }
}
const getCreditById = async (req, res) => {
  const { creditId } = req.params
  try {
    const credit = await Credit.findById(creditId)
    res.status(200).json(
      credit
    )
  } catch (error) {
    res.status(400).json(
      error
    )
  }
}

const getPaymentsByCreditId = async (req, res) => {
  const { id } = req.params
  try {
    const payments = await Payment.find({ creditId: id })
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
  createCredit,
  createCreditExtension,
  getAllCredits,
  getPaymentsByCreditId,
  getCreditById
}
