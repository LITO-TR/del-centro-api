const { Router } = require('express')

const creditController = require('../controllers/credit.controller')

const router = Router()

router.post('/', creditController.createCredit)

module.exports = router
