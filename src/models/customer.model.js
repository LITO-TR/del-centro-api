
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const customerSchema = new Schema({
  name: String,
  lastName: String,
  address: String,
  DNI: String,
  phoneNumber: String,
  civilStatus: String,
  createdAt: Date,
  updateAt: Date
})
module.exports = mongoose.model('Customers', customerSchema)
