const { Router } = require('express')
const employeeController = require('../controllers/employee.controller')

const router = Router()

router.get('/', employeeController.getAllEmployees)
router.post('/', employeeController.createEmployee)
router.get('/:id', employeeController.getOneByEmployeeId)
router.put('/:id', employeeController.updateEmployee)
router.delete('/:id', employeeController.deleteEmployee)
module.exports = router
