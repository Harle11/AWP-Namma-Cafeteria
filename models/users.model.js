const mongoose=require('mongoose');

var usersSchema=new mongoose.Schema({
    eid:{
        type: String    
    },
    pwd:{
        type:String
    },
    name:{
        type:String
    },
    quick_orders:{
        type:Array
    }
});

mongoose.model('users',usersSchema);