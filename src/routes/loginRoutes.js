const express=require("express");
const loginRouter=express.Router();
const passport=require('passport');
const User=require('../model/User');
const{ensureAuthenticated}=require('../config/auth')

function router(nav)
{loginRouter.get('/',function(req,res){
    res.render('login',{nav,
        
        title:'Library'
    })
})
loginRouter.post('/',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
})
// loginRouter.get('/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard',{nav,title:'Library',
//  name:req.user.name
// }));
// // logout handle
// loginRouter.get('/logout',(req,res)=>{
//     req.logout();
  
//     req.flash('success_msg','You are logged out')
//     res.redirect('/login');
    
// })

return loginRouter
}
module.exports=router;