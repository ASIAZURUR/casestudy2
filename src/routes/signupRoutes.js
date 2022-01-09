const express=require("express");
const bycrypt=require('bcryptjs');

const signupRouter=express.Router();
const User=require('../model/User');
function router(nav)
{signupRouter.get('/',function(req,res){
    res.render('signup',{
        nav,
        title:'Library'
    })
})


signupRouter.post('/',function(req,res){
    console.log(req.body)
 const{name,phone,email,password,confirmpassword}=req.body;
 
// var things={username:req.body.username,
//         phone:req.body.phone,
//         email:req.body.email,
//         password:req.body.password,
//         confirmpassword:req.body.confirmpassword}
//         var userdata= User(things);
//         userdata.save(); 
let errors=[];
        User.findOne({email:email})
        .then(user=>{
            if(user){errors.push({msg: 'Email is already registered '})
            res.render('signup',{
                nav,
                title:'Library',name,
                phone,email,password,errors,confirmpassword}
            )
            }
            // User.findOne({phone:phone})
            // .then(user=>{
            //     if(user){errors.push({msg: 'Phone no. is already registered '})
            //     res.render('signup',{
            //         nav,
            //         title:'Library',username,
            //         phone,email,password,confirmpassword,errors}
            //     )
            //     }
          else {
            const newUser=new User({
                name,phone,email,password
            });
           //hash password
           bycrypt.genSalt(10,(err,salt)=>
           bycrypt.hash(newUser.password,salt,(err,hash)=>{
               if(err) throw err;
               //Set password to hashed
               newUser.password=hash;
               //save user
               newUser.save()
               .then(user=>{
                   req.flash('success_msg','You are now registered and can login');
                   res.redirect('/login')
               })
               .catch(err=>console.log(err))
           })
           )
          }
     
            
    })
})

return signupRouter
}
module.exports=router;