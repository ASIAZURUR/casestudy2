//Accessing Mongoose Package
const mongoose=require('mongoose');
//Database connection

// mongoose.connect('mongodb://localhost:27017/library');
// mongoose.connect('mongodb+srv://userone:userone@asiafiles.w7kkj.mongodb.net/librarymodel?retryWrites=true&w=majority');

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