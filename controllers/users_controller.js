module.exports.profile=function(req,res){
    return res.render("user_profile",{
        title:"Profile"
    })
}

module.exports.edit=function(req,res){
    return res.end('<h1>Edit Profile</h1>')
}

module.exports.signIn = function(req,res){
    return res.render("user_sign_in",{
        title:"Sign In"
    })
}

module.exports.signUp=function(req,res){
    return res.render("user_sign_up",{
        title:"Sign Up"
    })
}

module.exports.create=function(req,res){
  //todo
}

module.exports.createSession=function(req,res){
  //todo
}