const mongoose = require('mongoose')

const bmscafeteriaSchema = new mongoose.Schema({
  dish_type:{
    type: String,
    required: true
  },
  dish_name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  available:{
    type: Boolean,
    default: true
  },
  url:{
    type: String
  }
})

module.exports = mongoose.model('bmscafeteria', bmscafeteriaSchema)