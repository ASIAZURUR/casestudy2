const mongoose=require('mongoose');
// const passportLocalMongoose = require("passport-local-mongoose");
// mongoose.connect('mongodb://localhost:27017/library');
// mongoose.connect('mongodb+srv://userone:userone@asiafiles.w7kkj.mongodb.net/librarymodel?retryWrites=true&w=majority');
const Schema=mongoose.Schema;
const loginSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    phone:{
        type:String,
        required:true,
        maxlength:12,
    
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength:8,
        // unique:true
    }
//    confirmpassword:{
//         type:String,
//         required: true,
//         minlength:8

//     }
  
    // username:String,
    // phone:Number,
    // email:String ,
    // password:String,
    // password2:String
});

// UserSchema.plugin(passportLocalMongoose);
var User= mongoose.model("User",loginSchema);
module.exports=User;


