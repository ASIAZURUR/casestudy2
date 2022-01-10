const express=require("express");
const multer=require('multer');
const adminAuthorRouter=express.Router();
const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname);
    }
})
const upload=multer({storage:fileStorageEngine})
const Authordata=require('../model/Authordata')
function find(nav)
{adminAuthorRouter.get('/',function(req,res){
    res.render('addAuthor',{
        nav,
        title:'Library'
    })
})
adminAuthorRouter.post('/add',upload.single('image'),function(req,res){
    console.log(req.file);
    var content={
        name: req.body.name,
        books:req.body.books,
        details:req.body.details,
        image:req.file.filename}
        // console.log(req.file.filename)
 var author = Authordata(content);
 author.save();//saving to database
 res.redirect('/authors');

})
return adminAuthorRouter
}
module.exports=find;