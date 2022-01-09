const express = require('express');
const updatebookRouter = express.Router();
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
const Bookdata = require('../model/Bookdata');
function router(nav){
    updatebookRouter.get('/',function(req,res){
        res.render('updatebook',{
            nav,
            title:'Library'
        });
    });

    updatebookRouter.get('/:id',function(req,res){
        const id = req.params.id;
        
        Bookdata.findById(id,function(err,doc){
            if(!err){
                res.render('updateBook',{
                    nav,
                    title:'Library',
                    book: doc 
                });
            }
            else{
                console.log(err);
            }
        });
    });

    updatebookRouter.post('/:id',upload.single('image'),function(req,res){
        const id = req.params.id;
        
        var updateditem = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.file.filename 
        }

        Bookdata.updateOne({_id:id}, updateditem, (err)=>{
            if(!err){
                res.redirect('/books');
            }
            else{
                console.log(err);
            }
        });
    });
    return updatebookRouter;
}

module.exports = router;