const Credit = require('../models/credit.model')
const creditHelper = require('../helpers/credit.helper')
const createCredit = async (req, res) => {
  const creditData = req.body

  creditData.creditType = 'NUEVO CREDITO'
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount
  creditData.firstPayDate = creditHelper.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.discount = 0.0
  creditData.expirationDate = creditHelper.getExpirationDay(new Date(creditData.firstPayDate), creditData.numberOfQuotas, creditData.paymentMethod)
  creditData.currentDate = creditHelper.plusDate(new Date(), 0)
  creditData.disbursedAmount = creditData.creditAmount
  creditData.quotasAmount = creditData.totalAmount / creditData.numberOfQuotas
  creditData.quotas = creditHelper.getQuotas(new Date(creditData.firstPayDate), creditData.numberOfQuotas, creditData.paymentMethod, creditData.quotasAmount)
  creditData.debtAmount = 0.0
  creditData.interestAmount.toFixed(2)
  creditData.totalAmount.toFixed(2)
  creditData.quotasAmount.toFixed(2)
  creditData.mora.toFixed(2)
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
  creditData.expirationDate = creditHelper.getExpirationDay(creditData.firstPayDay, creditData.numberOfQuotas, creditData.paymentMethod)

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

module.exports = {
  createCredit,
  createCreditExtension
}
