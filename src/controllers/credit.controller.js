const Credit = require('../models/credit.model')
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
  creditData.payments = creditHelper.getPayments(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod, creditData.paymentsAmount)
  creditData.debtAmount = 0.0
  try {
    const credit = await Credit.create(req.body)
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
  const { creditId, paymentNro } = req.params
  const propertyPaid = `payments.${paymentNro}.isPaid`
  const propertyPaymentDate = `payments.${paymentNro}.paymentDate`
  const objTmp = {}
  objTmp[propertyPaymentDate] = creditHelper.plusDate(new Date(), 0)
  objTmp[propertyPaid] = true

  try {
    const credit = await Credit.findById(creditId)
    console.log('entre')
    objTmp.debtAmount = creditHelper.getDebt(credit.debtAmount, credit.paymentsAmount)
    const creditUpdated = await Credit.updateOne({ _id: creditId }, objTmp)

    res.status(200).json(
      creditUpdated
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
  paymentQuota
}
