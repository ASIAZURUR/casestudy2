//Accessing Mongoose Package
const mongoose=require('mongoose');
//Database connection
// mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://userone:userone@asiafiles.w7kkj.mongodb.net/librarymodel?retryWrites=true&w=majority');
const Schema=mongoose.Schema;
//Schema definition
const BookSchema=new Schema({
    title:String,
    author:String,
    genre:String,
    image:String
});
//Model creation
var Bookdata= mongoose.model('bookdata',BookSchema);
module.exports=Bookdata;