const { Router } = require('express')

const paymentController = require('../controllers/payment.controller')

const router = Router()
router.put('/:paymentId/method/:method/customer-payment/:customerPayment', paymentController.paymentQuota)
router.get('/day/:day/month/:month/year/:year', paymentController.getPaymentsByDate)
module.exports = router
