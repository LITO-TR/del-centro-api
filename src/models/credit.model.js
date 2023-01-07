const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditSchema = new Schema({
  product: String,
  creditAmount: Number,
  interestPercent: Number,
  interestAmount: Number,
  time: Number,
  totalAmount: Number,
  paymentMethod: String, // day or week
  numberOfQuotas: Number,
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
