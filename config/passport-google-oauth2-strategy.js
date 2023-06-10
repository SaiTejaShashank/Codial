const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require("../models/user");

passport.use(new googleStrategy({
    clientID:"571280437751-jsrcsd1b7qaljek6v2177p6ehgus4rdj.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},//callback function
function(accesToken,refreshToken,profile,done){

    User.findOne({email:profile.emails[0].value}).then((user)=>{

        console.log(profile);

        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }).then((user)=>{
                return done(null,user);
            }).catch((err)=>{
                console.log('error in creating user in google strategy passport',err);
                return;
            })

        }

    }).catch((err)=>{
        console.log('error in google strategy-passport',err);
        return;
    })
}

))

module.exports = passport;