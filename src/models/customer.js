
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const customerSchema = new Schema({
  name: String,
  lastName: String,
  address: String,
  DNI: String,
  civilStatus: String
})
module.exports = mongoose.model('Customers', customerSchema)
