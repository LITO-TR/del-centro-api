const { Router } = require('express')
const creditController = require('../controllers/credit.controller')
const router = Router()
router.get('/', creditController.getAllCredits)
router.post('/', creditController.createCredit)
router.post('/:creditId/extension', creditController.createCreditExtension)
router.get('/:id/payments', creditController.getPaymentsByCreditId)
router.get('/:creditId', creditController.getCreditById)
router.get('/:creditId/customer', creditController.getCustomerByCreditId)
router.get('/day/:day/month/:month/year/:year', creditController.getCreditsByCreationDate)
module.exports = router
