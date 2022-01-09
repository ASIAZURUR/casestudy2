const express=require('express');

const app=express();
const flash=require('connect-flash');
const session=require('express-session');

const User=require('./src/model/User')
const{ensureAuthenticated}=require('./src/config/auth');
const{ensureAuthorized}=require('./src/config/auth-admin')

  const  passport  =  require("passport");
  const bodyParser = require('body-parser');
  


    
    
   
    //express session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
        
      }))

      //Passport middleware
      app.use(passport.initialize());
       app.use(passport.session());
    //    app.use(express.static('./public'));
    //    app.set('view engine','ejs');
    //    app.set('views','./src/views');
       app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  
        //config passport
    require('./src/config/passport')(passport);
      //connect flash

      app.use(flash());
      //Global vars
      app.use((req,res,next)=>{
          res.locals.success_msg=req.flash('success_msg');
          res.locals.error_msg=req.flash('error_msg');
          res.locals.error=req.flash('error');
          res.locals.erroraccess_msg=req.flash('erroraccess_msg');
          next();

      })

const nav=[
    {
        link:'/books',name:'Books'
    },
    {link:'/authors',name:'Authors'
},


{link:'/logout',name:'Log out'},
{link:'/signup',name:'Sign up'},
{link:'/login',name:'Login'}

]
const loginRouter=require('./src/routes/loginRoutes')(nav);
const signupRouter=require('./src/routes/signupRoutes')(nav);
const booksRouter=require('./src/routes/bookRoutes')(nav);
const adminRouter=require('./src/routes/adminRoutes')(nav);
const adminAuthorRouter=require('./src/routes/adminaRoutes')(nav);
const authorsRouter=require('./src/routes/authorRoutes')(nav);
const updatebookRouter=require('./src/routes/updatebookRoutes')(nav);
const updateauthorRouter=require('./src/routes/updateauthorRoutes')(nav);


app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');


app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/books',ensureAuthenticated,booksRouter);
app.use('/admin',ensureAuthorized,adminRouter);
app.use('/admin1',ensureAuthorized,adminAuthorRouter);
app.use('/authors',ensureAuthenticated,authorsRouter);
app.use('/update',ensureAuthorized,updatebookRouter);
app.use('/edit',ensureAuthorized,updateauthorRouter);
app.get('/',function(req,res){
    res.render("index",
    {
     nav,
       title:'Library' 
       
    });
});
app.get('/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard',{nav,title:'Library',
 name:req.user.name
}));
// logout handle
app.get('/logout',(req,res)=>{
    req.logout();
  
    req.flash('success_msg','You are logged out')
    res.redirect('/login');
    
})


app.listen(process.env.PORT || 5002);