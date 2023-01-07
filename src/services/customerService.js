const Customer = require('../models/customer')

const getCustomers = async () => {
  try {
    const customers = await Customer.find()
    return customers
  } catch (error) {
    throw Error(error)
  }
}

module.exports = { getCustomers }
