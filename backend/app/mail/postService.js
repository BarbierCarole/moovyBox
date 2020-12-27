const nodemailer = require('nodemailer');

require('dotenv').config(); 

const password = process.env.SMTPPASSWORD; 
const mailUser = process.env.SMTPUSER;

let infoServerMail = {
 /*host: 'smtp.gmail.com',
  port: 465,
  secure: true,*/
  service: 'gmail',

  auth: {
     user: mailUser,
     pass: password
  }, 
  // tls: 443
};
// console.log (infoServerMail);

let transportGmail  = nodemailer.createTransport(infoServerMail);

const sendMail = async (emailData) => {

  // ? emailData {subject, email, html}
  // - Use the email function sendMail({userEmail, userToken, subject, html})
  try {
    const message = {
      from: process.env.SMTPUSER, // Sender address
      to: emailData.email,  // List of recipients
      subject: emailData.subject, // Subject line
      html: emailData.html// html body define by de postService caller
    };

    const result = await transportGmail.sendMail(message);

    return result; 

  } catch (error) {
    console.trace(error); 
  }
}

module.exports = sendMail;
