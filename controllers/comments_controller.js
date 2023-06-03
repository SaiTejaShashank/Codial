const Comment=require("../models/comment")
const Post=require("../models/post");

module.exports.create=function(req,res){

    Post.findById(req.body.post).then((post)=>{

        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }).then((comment)=>{
                //console.log(comment._id); check if it is comment
                post.comments.push(comment._id);
                post.save();
                res.redirect('/');
            }).catch((error)=>{
                console.log('Error in comments controller adding comment',error);
            })
        }
    }).catch((error)=>{
        console.log('Error in comments controller getting post',error);
    })
    
}