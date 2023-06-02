const { response } = require('express');
const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render("user_profile",{
        title:"Profile"
    })
}

module.exports.edit=function(req,res){
    return res.end('<h1>Edit Profile</h1>')
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render("user_sign_in",{
        title:"Sign In"
    })
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render("user_sign_up",{
        title:"Sign Up"
    })
}

module.exports.create=function(req,res){
    
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}).then((user)=>{

        if(!user){
            User.create(req.body).then((user)=>{
                    return res.redirect('/users/sign-in')
                }).catch((error)=>{
                    if(error){
                        console.log("Error in creating user while signing up");
                        return
                    }
                })
          
        }
        else{
            return res.redirect('back');
        }

    }).catch((error)=>{
        if(error){
            console.log("Error in finding user in signing up");
            return
        }
    })
        

    
    
}

module.exports.createSession=function(req,res){
  return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
         return res.redirect('/');
      });
  
  }