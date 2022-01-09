//Accessing Mongoose Package
const mongoose=require('mongoose');
//Database connection

mongoose.connect('mongodb://localhost:27017/library');
const Schema=mongoose.Schema;

const Schema2=mongoose.Schema;

//Schema definition
const AuthorSchema=new Schema({
    
    name:String,
    books:String,
    details:String,
    image:String
});
//Model creation
var Authordata= mongoose.model('authordata',AuthorSchema);
module.exports=Authordata;