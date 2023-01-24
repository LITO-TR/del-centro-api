const { Router } = require('express')

const paymentController = require('../controllers/payment.controller')

const router = Router()
router.put('/:paymentId', paymentController.paymentQuota)
router.get('/day/:day/month/:month/year/:year', paymentController.getPaymentsByDate)
module.exports = router
