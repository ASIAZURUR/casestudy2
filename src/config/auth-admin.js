module.exports={
    ensureAuthorized:function(req,res,next){
        if(req.isAuthenticated()&& req.user.name=="admin")
      {  return next();}
    
    req.flash('erroraccess_msg','Sorry you have no permission to  edit,delete and add new.');
    res.redirect('/dashboard');
}
}