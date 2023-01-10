const { Router } = require('express')

const creditController = require('../controllers/credit.controller')

const router = Router()

router.post('/', creditController.createCredit)
router.put('/credit/:creditId/payment/:paymentNro', creditController.paymentQuota)
module.exports = router
