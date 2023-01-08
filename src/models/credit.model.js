const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditSchema = new Schema({
  product: String,
  creditAmount: Number,
  decimalInterest: Number, // decimal /100
  interestAmount: Number,
  numberOfQuotas: Number,
  currentDate: Number,
  totalAmount: Number,
  paymentMethod: String, // day or week
  quotasAmount: Number,
  mora: Number,
  firstPayDay: Date,
  expirationDay: Date,
  discount: Number, // ampliacion?
  disbursedAmount: Number, // desembolso
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }
})

module.exports = mongoose.model('Credits', creditSchema)
