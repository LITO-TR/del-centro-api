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
  creditData.paymentsAmount = creditData.totalAmount / creditData.numberOfPayments
  // creditData.payments = creditHelper.getPayments(new Date(creditData.firstPayDate), creditData.numberOfPayments, creditData.paymentMethod, creditData.paymentsAmount)
  creditData.debtAmount = creditData.creditAmount
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

const paymentQuota = async (req, res) => {
  const { creditId, paymentId } = req.params
  const credit = await Credit.findById(creditId)
  const payment = await Payment.findById(paymentId)
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
    const updatedPayment = await Payment.updateOne({ _id: paymentId }, objPayment)
    const updatedCredit = await Credit.updateOne({ _id: creditId }, objCredit)

    res.status(200).json({
      updatedCredit,
      updatedPayment
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
