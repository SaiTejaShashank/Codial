const Post=require("../models/post")
const Comment = require("../models/comment");

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

module.exports.destroy = function(req,res){
    //.id means converting the object id into string
    Post.findById(req.params.id).then((post)=>{
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post:req.params.id}).then(()=>{return res.redirect('back')}).catch((error)=>{console.log('error in posts controller delete comments',error)})
        }
        else{
            return res.redirect('back')
        }
    })
}