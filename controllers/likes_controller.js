const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try{
        //likes/toggle/?id=675387&type=Post

        let likeable;
        let deleted =false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes'); 
        }

        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true
        }
        else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            })

            //check like or newLike._id
            likeable.likes.push(newLike._id)
            likeable.save()
        }

        return res.json(200,{
            message:"Request successful",
            data:{
                deleted:deleted
            }
        })

    }
    catch(error){
        console.log('Error in like controller',error)
        return res.json(500,{
            message:"Internal Server Error"
        })

    }
}
