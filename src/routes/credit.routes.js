const { Router } = require('express')
const creditController = require('../controllers/credit.controller')
const router = Router()
router.get('/', creditController.getAllCredits)
router.post('/', creditController.createCredit)
router.post('/:creditId/extension', creditController.createCreditExtension)
router.get('/:id/payments', creditController.getPaymentsByCreditId)
router.get('/:creditId', creditController.getCreditById)
module.exports = router
