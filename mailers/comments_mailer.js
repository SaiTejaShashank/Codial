const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{

    nodemailer.transporter.sendMail({
        from:'shashankpunna21@gmail.com',
        to:comment.user.email,
        subject:'Your comment Published!',
        html:'<h1>Yup! your comment is published :) </h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return
        }
        console.log('Message sent',info);
        return;
    })
}