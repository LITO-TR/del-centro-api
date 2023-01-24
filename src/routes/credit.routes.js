const { Router } = require('express')
const creditController = require('../controllers/credit.controller')
const router = Router()
router.get('/', creditController.getAllCredits)
router.post('/', creditController.createCredit)
router.put('/payment/:paymentId', creditController.paymentQuota)
router.post('/:creditId/extension', creditController.createCreditExtension)
router.get('/:id/payments', creditController.getPaymentsByCreditId)
router.get('/:creditId', creditController.getCreditById)
router.get('/payment/day/:day/month/:month/year/:year', creditController.getPaymentsByDate)
module.exports = router
