const { Router } = require('express')

const paymentController = require('../controllers/payment.controller')

const router = Router()
// router.get('/', creditController.getAllCredits)
// router.post('/', creditController.createCredit)
router.put('/:paymentId', paymentController.paymentQuota)
// router.post('/:creditId/extension', creditController.createCreditExtension)
// router.get('/:id/payments', creditController.getPaymentsByCreditId)
// router.get('/:creditId', creditController.getCreditById)
router.get('/day/:day/month/:month/year/:year', paymentController.getPaymentsByDate)
module.exports = router
