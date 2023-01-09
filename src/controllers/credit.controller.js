const Credit = require('../models/credit.model')
const getFirstPayDat = require('../helpers/credit.helper')
const createCredit = async (req, res) => {
  const creditData = req.body
  creditData.interestAmount = creditData.creditAmount * creditData.decimalInterest
  creditData.totalAmount = creditData.creditAmount + creditData.interestAmount
  creditData.firstPayDay = getFirstPayDat.getFirstDateByPaymentMethod(creditData.paymentMethod)
  try {
    const credit = await Credit.create(req.body)
    res.status(400).json(
      credit
    )
  } catch (error) {
    res.status(200).json({
      msg: error
    })
  }
}

module.exports = {
  createCredit
}
