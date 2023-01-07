const { Router } = require('express')
const customerController = require('../controllers/customer.controller')

const router = Router()

router.get('/', customerController.getAllCustomers)
module.exports = router
