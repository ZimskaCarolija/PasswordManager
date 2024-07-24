const nodemailer = require('nodemailer');
require('dotenv').config();
const sendeMail=async(emailT,subject,text)=>{
    //transporter
    const transporter  = nodemailer.createTransport({

        service:'Gmail ',
        auth:{
            user : process.env.emailUser,
            pass : process.env.emailPassword
        }
    });
    //email
    const mailTEmp={
        from:"PassswordManadger "+process.env.emailUser,
        to:emailT,
        subject:subject,
        text:text
    }
    await transporter.sendMail(mailTEmp);
}
module.exports = sendeMail