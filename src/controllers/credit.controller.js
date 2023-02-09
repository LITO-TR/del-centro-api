const Credit = require('../models/credit.model')
const Payment = require('../models/payment.model')
const Customer = require('../models/customer.model')

const creditHelper = require('../helpers/credit.helper')
const createCredit = async (req, res) => {
  const creditData = req.body
  creditData.creditType = 'NUEVO CREDITO'
  creditData.interestAmount = parseFloat((creditData.creditAmount * creditData.decimalInterest).toFixed(2))
  creditData.totalAmount = parseFloat((creditData.creditAmount + creditData.interestAmount).toFixed(2))
  creditData.firstPayDate = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.expirationDate = creditHelper.getExpirationDay(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod)
  creditData.currentDate = creditHelper.plusDate(new Date(), 0)
  creditData.disbursedAmount = creditData.creditAmount
  creditData.paymentsAmount = parseFloat((creditData.totalAmount / creditData.numberOfPayments).toFixed(2))
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
  credit.creditStatus = 'finalizado'
  creditData.creditType = 'AMPLIACION'
  creditData.interestAmount = parseFloat((creditData.creditAmount * creditData.decimalInterest).toFixed(2))
  creditData.totalAmount = parseFloat((creditData.creditAmount + creditData.interestAmount).toFixed(2))
  creditData.debtAmount = credit.debtAmount
  creditData.firstPayDate = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.expirationDate = creditHelper.getExpirationDay(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod)
  creditData.currentDate = creditHelper.plusDate(new Date(), 0)
  creditData.paymentsAmount = parseFloat((creditData.totalAmount / creditData.numberOfPayments).toFixed(2))
  creditData.disbursedAmount = parseFloat((creditData.creditAmount - creditData.debtAmount).toFixed(2))
  creditData.customerId = credit.customerId
  creditData.employeeId = credit.employeeId
  console.log(creditData.creditAmount)

  try {
    const creditExtension = await Credit.create(req.body)
    await Payment.insertMany(creditHelper.getPayments(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod, creditData.paymentsAmount, creditExtension._id))
    await Credit.findOneAndUpdate({ _id: credit.id }, {
      debtAmount: 0,
      creditStatus: 'finalizado'
    })
    await Payment.updateMany({ creditId: credit.id }, {
      status: 'PAGADO',
      paymentDate: creditHelper.plusDate(new Date(), 0)

    })
    res.status(200).json(
      creditExtension
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

const getCustomerByCreditId = async (req, res) => {
  const { creditId } = req.params
  try {
    const credit = await Credit.findById(creditId)
    const customer = await Customer.findById(credit.customerId)
    res.status(200).json(
      customer
    )
  } catch (error) {
    res.status(200).json(
      error
    )
  }
}

const getCreditsByCreationDate = async (req, res) => {
  const { day, month, year } = req.params
  try {
    const credits = await Credit.find({ currentDate: year + '/' + month + '/' + day })
    res.status(200).json(
      credits
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
  getCreditById,
  getCustomerByCreditId,
  getCreditsByCreationDate
}
