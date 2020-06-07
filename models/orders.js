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
  dish_id:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Orders', orderSchema)