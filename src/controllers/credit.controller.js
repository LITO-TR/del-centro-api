const Credit = require('../models/credit.model')
const getFirstPayDat = require('../helpers/credit.helper')
const createCredit = async (req, res) => {
  const creditData = req.body
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount
  creditData.firstPayDay = getFirstPayDat.getFirstDateByPaymentMethod(creditData.paymentMethod)
  creditData.discount = 0.0
  creditData.disbursedAmount = creditData.creditAmount
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
  const { id } = req.params
  const creditData = req.body
  creditData.disbursedAmount = creditData.creditAmount - creditData.discount
  try {
    const creditExtension = await Credit.updateOne(id, req.body)
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
