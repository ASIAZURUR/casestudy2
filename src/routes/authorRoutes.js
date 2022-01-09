const express=require('express');
const authorsRouter=express.Router();
const Authordata=require('../model/Authordata');
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
    authorsRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",
            {
                nav,
                title:'Library',
                authors
            });
        });

        })
        authorsRouter.get('/:id',function(req,res){
            const id=req.params.id;
            Authordata.findOne({_id:id})
            .then(function(author){
                res.render('author',{
                    nav,
                    title:'Library',
                    author
                })
            })  
            })
            authorsRouter.get('/delete/:id',ensureAuthorized, function(req,res){
                const id =  req.params.id;
                Authordata.findByIdAndDelete({_id:id}, (err)=>{
                    if(!err){
                        res.redirect('/authors')
                    }
                    else{
                        console.log(err);
                        res.end(err);
                    }
                });
        
            });
            authorsRouter.get('/:id/delete',ensureAuthorized,function(req,res){
                const id =  req.params.id;
                Authordata.findOneAndDelete({_id:id} ,(err)=>{
                    if(!err){
                        res.redirect('/authors')
                    }
                    else{
                        console.log(err);
                        res.end(err);
                    }
                });
        
            });
        return authorsRouter
    }
        module.exports=router;