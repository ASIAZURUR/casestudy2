const express=require('express');
const booksRouter=express.Router();
const Bookdata=require('../model/Bookdata');
const{ensureAuthorized}=require('../config/auth-admin')
function router(nav)
{
    // var books=[
    //     {
    //         title:'Tom and Jerry',
    //         author:'Joseph Barbera',
    //         genre:'cartoon',
    //         img:"Tom-And-Jerry.jpg"
    //     },
    //     {
    //         title:'Harry Potter',
    //         author:'J K Rowling',
    //         genre:'Fantasy',
    //         img:"harry-potter.jpg"
    //     },
    //     {
    //         title:'Pathumayude Aadu',
    //         author:'Basheer',
    //         genre:'Novel',
    //         img:"basheer.jpg"
    //     }
    // ];
    booksRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",
            {
                nav,
                title:'Library',
                books
            });
        });

        })
      
    booksRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id:id})
        
        .then(function(book){
            res.render('book',{
                nav,
                title:'Library',
                book
            })
        })  
        })
        booksRouter.get('/:id/delete',ensureAuthorized,function(req,res){
            const id =  req.params.id;
            Bookdata.findOneAndDelete({_id:id} ,(err)=>{
                if(!err){
                    res.redirect('/books')
                }
                else{
                    console.log(err);
                    res.end(err);
                }
            });
    
        });
        booksRouter.get('/delete/:id',ensureAuthorized,function(req,res){
            const id =  req.params.id;
            Bookdata.findByIdAndDelete({_id:id}, (err)=>{
                if(!err){
                    res.redirect('/books')
                }
                else{
                    console.log(err);
                    res.end(err);
                }
            });
    
        });
      
    return booksRouter;
}

module.exports=router;