const Post =require('../models/post');
module.exports.home = function(req,res){

    //console.log(req.cookies)
    //res.cookie('user',45);

   /* Post.find({}).then((posts)=>{
        return res.render("home",{
            title:"Home",
            posts:posts
        });
    }).catch((error)=>{
        console.log('Error in fetching posts ---> home controller',error)
    })*/

    Post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).then((posts)=>{
        return res.render("home",{
            title:"Codial | Home",
            posts:posts
        })
    }).catch((error)=>{console.log('Error in fetching posts --> Home Controller',error)})
    
}

module.exports.feed = function(req,res){
    return res.end('<h1>Feed Screen</h1>')
}