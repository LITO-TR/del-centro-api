const customerService = require('../services/customer.service')

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers()
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
  try {
    const createdCustomer = customerService.createCustomer(req.body)
    res.status(200).json(
      createdCustomer
    )
  } catch (error) {

  }
}

module.exports = {
  getAllCustomers,
  createCustomer
}
