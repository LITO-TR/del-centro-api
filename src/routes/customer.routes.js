const { Router } = require('express')
const customerController = require('../controllers/customer.controller')

const router = Router()

router.get('/', customerController.getAllCustomers)
router.post('/', customerController.createCustomer)
router.get('/:id', customerController.getOneByCustomerId)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)
router.get('/:customerId/credits', customerController.getCreditsByCustomer)
module.exports = router
