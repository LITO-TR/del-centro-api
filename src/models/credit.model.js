const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditSchema = new Schema({
  creditType: String,
  product: String,
  creditAmount: Number,
  decimalInterest: Number, // decimal /100
  numberOfQuotas: Number,
  quotasAmount: Number,
  interestAmount: Number,
  currentDate: Number,
  totalAmount: Number,
  paymentMethod: String, // day or week
  mora: Number,
  firstPayDate: String,
  expirationDate: String,
  discount: Number, // ampliacion?
  disbursedAmount: Number,
  debtAmount: Number,
  quotas: [{ nro: Number, date: String, paymentAmount: Number, isPaid: Boolean, paymentDate: String, moraDays: Number }], // desembolso
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
