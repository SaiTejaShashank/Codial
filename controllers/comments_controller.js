const Comment=require("../models/comment")
const Post=require("../models/post");

const commentsMailer = require('../mailers/comments_mailer');

module.exports.create=async function(req,res){

    try{
        let post =await Post.findById(req.body.post)

        if(post){
           let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })

            post.comments.push(comment._id);
            post.save();

            comment= await comment.populate('user')
            commentsMailer.newComment(comment);

            req.flash('success','Comment posted!');

            res.redirect('/');
        }

    }
    catch(error){
        req.flash('error',error);
        console.log('Error in comments controller --> create',error);
        return;
    }
    
}

module.exports.destroy = function(req,res){
    //.id means converting the object id into string
    Comment.findById(req.params.id).then((comment)=>{
        if(comment.user == req.user.id){

            let postId= comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}).then(()=>{
                req.flash('success','Comment deleted!');
                return res.redirect('back')
            }).catch((error)=>{
                req.flash('error',error);
                console.log("Error in comments controller --> destroy",error)
            })
             }
        else{
            req.flash('error','Not authorized to delete comment!');
            return res.redirect('back')
        }
    })
}