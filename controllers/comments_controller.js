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

module.exports.destroy = function(req,res){
    //.id means converting the object id into string
    Comment.findById(req.params.id).then((comment)=>{
        if(comment.user == req.user.id){

            let postId= comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}).then(()=>{
                return res.redirect('back')
            }).catch((error)=>{
                console.log("Error in comments controller --> destroy",error)
            })
             }
        else{
            return res.redirect('back')
        }
    })
}