const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
  name: String,
  lastName: String,
  phoneNumber: String,
  DNI: String,
  address: String
})
module.exports = mongoose.model('Employees', employeeSchema)
