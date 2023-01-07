const Customer = require('../models/customer.model')

const getCustomers = async () => {
  try {
    const customers = await Customer.find()
    return customers
  } catch (error) {
    throw Error(error)
  }
}
const createCustomer = async (newCustomer) => {
  try {
    const customer = await Customer.create(newCustomer)
    return customer
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  getCustomers,
  createCustomer
}
