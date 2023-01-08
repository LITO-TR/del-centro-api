const Employee = require('../models/employee.model')
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
    return res.json(
      employees
    )
  } catch (error) {
    return res.status(400).json({
      message: error
    })
  }
}

const getOneByEmployeeId = async (req, res) => {
  const { id } = req.params
  try {
    const employee = await Employee.findById(id)
    res.status(200).json(
      employee
    )
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

const createEmployee = async (req, res) => {
  const { name } = req.body // manda en el cuerpo lo extraigo asi
  const employeesData = req.body
  employeesData.createdAt = new Date()
  employeesData.updateAt = new Date()
  console.log(name)
  try {
    const createdEmployee = await Employee.create(req.body)
    res.status(200).json({
      createdEmployee
    })
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

const updateEmployee = async (req, res) => {
  const employeeData = req.body
  employeeData.updateAt = new Date()
  const { id } = req.params
  try {
    await Employee.updateOne({ _id: id }, req.body)
    res.status(200).json(
      'Employee updated'
    )
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

const deleteEmployee = async (req, res) => {
  const { id } = req.params
  try {
    await Employee.findByIdAndDelete(id)
    return res.status(200).json({
      msg: 'Employee deleted'
    })
  } catch (e) {
    return res.status(400).json({
      msg: e
    })
  }
}

module.exports = {
  getAllEmployees,
  getOneByEmployeeId,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
