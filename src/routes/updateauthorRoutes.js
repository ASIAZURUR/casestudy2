const express = require('express');
const updateauthorRouter = express.Router();
const multer=require('multer');


const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname);
    }
})
const upload=multer({storage:fileStorageEngine})
const Authordata = require('../model/Authordata');
function router(nav){
    updateauthorRouter.get('/',function(req,res){
        res.render('updateauthor',{
            nav,
            title:'Library'
        });
    });

    updateauthorRouter.get('/:id',function(req,res){
        const id = req.params.id;
        
        Authordata.findById(id,function(err,doc){
            if(!err){
                res.render('updateauthor',{
                    nav,
                    title:'Library',
                    author: doc 
                });
            }
            else{
                console.log(err);
            }
        });
    });

    updateauthorRouter.post('/:id',upload.single('image'),function(req,res){
        const id = req.params.id;
        
        var updateditem = {
            name: req.body.name,
            books:req.body.books,
            details:req.body.details,
            image:req.file.filename}
        

        Authordata.updateOne({_id:id}, updateditem, (err)=>{
            if(!err){
                res.redirect('/authors');
            }
            else{
                console.log(err);
            }
        });
    });
    return updateauthorRouter;
}

module.exports = router;