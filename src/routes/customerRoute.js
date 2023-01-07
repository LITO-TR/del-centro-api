const { Router } = require('express')
const customerController = require('../controllers/customerController')

const router = Router()

router.get('/', customerController.getAllCustomers)
module.exports = router
