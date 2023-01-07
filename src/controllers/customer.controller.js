const customer = require('../models/customer.model')
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customer.find()
    return res.json(
      customers
    )
  } catch (error) {
    return res.status(400).json({
      message: error
    })
  }
}

const createCustomer = async (req, res) => {
  const customerData = req.body
  customerData.createdAt = Date.now()
  customerData.updateAt = Date.now()
  try {
    const createdCustomer = await customer.create(req.body)
    res.status(200).json({
      msg: 'customer created',
      data: createdCustomer
    })
  } catch (error) {
    res.status(400).send({
      msg: error
    })
  }
}

module.exports = {
  getAllCustomers,
  createCustomer
}
