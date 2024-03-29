const Post =require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    try{
    let posts= await Post.find({}).sort('-createdAt').populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    let users= await  User.find({});
    return res.render("home",{
        title:"Codial | Home",
        posts:posts,
        all_users:users
    })
}
catch(error){
    console.log("Error in --> Home Controller",error);
}
}

module.exports.feed = function(req,res){
    return res.end('<h1>Feed Screen</h1>')
}