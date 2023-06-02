module.exports.home = function(req,res){
    return res.render("home",{
        title:"Home"
    });
}

module.exports.feed = function(req,res){
    return res.end('<h1>Feed Screen</h1>')
}