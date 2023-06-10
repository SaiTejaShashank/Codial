 
const nodemailer = require('nodemailer');

const  path  = require('path');

const ejs = require('ejs')

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    post:587,
    secure:false,
    auth:{
        user:'shashankpunna21',
        pass:'qopshgqmnnjkczxe'
    }
})

let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template',err);
                return
            }

            mailHTML=template
        }
        
    )

    return mailHTML;
}

module.exports = {
    renderTemplate:renderTemplate,
    transporter:transporter
}