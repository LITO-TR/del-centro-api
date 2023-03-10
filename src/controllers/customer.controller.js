const Customer = require('../models/customer.model')
const Credit = require('../models/credit.model')
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    return res.json(
      customers
    )
  } catch (error) {
    return res.status(400).json({
      message: error
    })
  }
}

const getOneByCustomerId = async (req, res) => {
  const { id } = req.params
  try {
    const customer = await Customer.findById(id)
    res.status(200).json(
      customer
    )
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

const createCustomer = async (req, res) => {
  const customerData = req.body
  customerData.createdAt = Date.now()
  customerData.updateAt = Date.now()
  try {
    const createdCustomer = await Customer.create(req.body)
    res.status(200).json({
      createdCustomer
    })
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

const updateCustomer = async (req, res) => {
  const customerData = req.body
  customerData.updateAt = new Date()
  const { id } = req.params
  try {
    await Customer.updateOne({ _id: id }, req.body)
    res.status(200).json(
      'customer updated'
    )
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

const deleteCustomer = async (req, res) => {
  const { id } = req.params
  try {
    await Customer.findByIdAndDelete(id)
    return res.status(200).json({
      msg: 'invoice deleted'
    })
  } catch (e) {
    return res.status(400).json({
      msg: e
    })
  }
}

const getCreditsByCustomer = async (req, res) => {
  const { customerId } = req.params
  try {
    const credits = await Credit.find({ customerId })
    res.status(200).json(
      credits
    )
  } catch (error) {
    res.status(200).json(
      error
    )
  }
}
module.exports = {
  getAllCustomers,
  getOneByCustomerId,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCreditsByCustomer
}
