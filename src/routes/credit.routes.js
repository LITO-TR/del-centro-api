const { Router } = require('express')
const creditController = require('../controllers/credit.controller')
const router = Router()

router.post('/', creditController.createCredit)
router.put('/:creditId/payment/:paymentId', creditController.paymentQuota)
router.post('/:creditId/extension', creditController.createCreditExtension)
// router.post(':idCredit/payments', paymentController)

module.exports = router
