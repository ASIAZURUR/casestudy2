const express=require("express");
const multer=require('multer');
const adminRouter=express.Router();

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname);
    }
})
const upload=multer({storage:fileStorageEngine})
const Bookdata=require('../model/Bookdata')
function router(nav)
{adminRouter.get('/',function(req,res){
    res.render('addBook',{
        nav,
        title:'Library'
    })
})
adminRouter.post('/add',upload.single('image'),function(req,res){
    console.log(req.file);
    var item={
        title: req.body.title,
        author:req.body.author,
        genre:req.body.genre,
        image:req.file.filename}
 var book = Bookdata(item);
 book.save();//saving to database
 res.redirect('/books');

})



return adminRouter
}
module.exports=router;