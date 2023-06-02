module.exports.profile=function(req,res){
    return res.render("user_profile",{
        title:"Profile"
    })
}

module.exports.edit=function(req,res){
    return res.end('<h1>Edit Profile</h1>')
}