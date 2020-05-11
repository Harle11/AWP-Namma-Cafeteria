const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/NammaDB',{userNewUrlParser:true},(err)=>{
  if (!err) {console.log("MongoDB Connection Succeeded")}
  else { console.log("Error in DB Connecton:"+err)}
});

require('./users.model');

