const Post=require("../models/post")
module.exports.create=function(req,res){

    Post.create({
        content:req.body.content,
        user:req.user._id
    }).then((user)=>{
        //console.log(user)
        return res.redirect('back')
    }).catch((error)=>{
        if(error){
            console.log("Error in creating a post");
            return;
        }
    })
    
}