const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
id:{
        type: String,
        required: true,
    },
nom:{
    type:String,
    required:true,
},
prenom:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},

phone:{
    type:Number,
    required:true,
},
age:{
    type:Number,
    required:true,
}

});
const User=mongoose.model('user',userSchema);
module.exports = User;