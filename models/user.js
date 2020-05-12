const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  eid:{
    type: String,
    required: true
  },
  pwd:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  quick_orders:{
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('User', userSchema)