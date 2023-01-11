const { Router } = require('express')
const creditController = require('../controllers/credit.controller')
const paymentController = require('../controllers/payment.controller')
const router = Router()

router.post('/', creditController.createCredit)
router.put('/:creditId/payment/:paymentId', creditController.paymentQuota)
// router.post(':idCredit/payments', paymentController)

module.exports = router
