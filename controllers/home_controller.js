const User=require('../models/user');
exports.login=function(req,res){
    const errors=req.flash().error||[]; 
    return res.render('login',{errors});
};
exports.createSession=function(req,res){
    console.log('ram ram bhai ji!');
    return res.redirect('/user/home');
};

exports.signup=function(req,res){
    return res.render('signup');
};
exports.createUser=function(req,res){
    if(req.body.confirm_password===req.body.password){
        req.body.balance=100;
        req.body.gold=0;
        User.create(req.body,function(err,newEntry){
            if(err){
                return console.log('error in inserting the post req:-',err);
            }
    
            console.log('Entry Done:-',newEntry);
            return res.redirect('/');
        });
    }
    else{
        console.log('Unmatched Passwords entered :(');
        return res.redirect('/signup');
    }
};
