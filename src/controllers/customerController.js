const CustomerService = require('../services/customerService')

const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerService.getCustomers()
    return res.json(
      customers
    )
  } catch (error) {
    return res.status(400).json({
      message: error
    })
  }
}

module.exports = { getAllCustomers }
