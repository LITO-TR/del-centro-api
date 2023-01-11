const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  paymentOrder: Number,
  date: String,
  payment: Number,
  status: String,
  paymentDate: String,
  moraDays: Number,
  paymentType: String,
  creditId: {
    type: Schema.Types.ObjectId,
    ref: 'Credits'
  }
})

module.exports = mongoose.model('Payments', paymentSchema)
