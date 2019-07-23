var express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./user'),
    LocalStrategy = require('passport-local');
var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'topsecreat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/auth1');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//       done(err, user);
//     });
//   });

app.post('/hello',(req,res)=>{
    console.log('requestedd');
    res.send('lineman1');
});

app.post('/auth',passport.authenticate('local'),function(req,res){
    console.log('i am here');
    console.log(req.user.devicehash);
    res.send(req.user.devicehash);
});

app.post('/signup',(req,res)=>{
    User.register(new User({username:req.body.username,devicehash:req.body.devicehash}),
    req.body.password,
    function(err,user){
        if(err){
            console.log(err);
            res.json({message:err})
        }
        else {
            console.log(user);
            res.json({message : user})
        }
    });
});

app.listen(4000,()=>{
    console.log('auth server started');
});