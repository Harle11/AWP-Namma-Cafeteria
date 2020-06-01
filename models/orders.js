const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  eid:{
    type: String,
    required: true
  },
  dish_name:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  quantity:{
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('Orders', orderSchema)