const { Router } = require('express')
const customerController = require('../controllers/customer.controller')

const router = Router()

router.get('/', customerController.getAllCustomers)
router.post('/', customerController.createCustomer)
module.exports = router
