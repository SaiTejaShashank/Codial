const express= require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db = require('./config/mongoose');

const session =require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy")

const passportJWT=require("./config/passport-jwt-strategy")

const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore=require('connect-mongo');

const sassMiddleware=require('node-sass-middleware');

const flash =require("connect-flash");
const customMiddleware= require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat Server is listening on port 5000');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));
app.use(express.urlencoded())
app.use(cookieParser());

//making uploads path available to browser to access profile images
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(express.static("./assets"));

app.use(expressLayouts);

//extract styles and scripts from sub pages into layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:"codial",
    secret:"saiteja",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/codial_development',
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash)
//use express router
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error running server ${err}`);
    }

    console.log(`Server is running on port: ${port}`)
})