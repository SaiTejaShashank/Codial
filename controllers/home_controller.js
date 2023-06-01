module.exports.home = function(req,res){
    return res.end('<h1>Server is up for Codial!</h1>')
}

module.exports.feed = function(req,res){
    return res.end('<h1>Feed Screen</h1>')
}