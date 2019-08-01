const fs = require("fs");

var nodemailer = require('nodemailer');

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}




var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cick.cick.cick.47@gmail.com',
    pass: '3896_cick.cick.cick_1456'
  }
});

var mailOptions = {
  from: 'cick.cick.cick.47@gmail.com',
  to: 'fire.god.47@gmail.com',
  subject: 'Verification Code',
  text: 'Your Code for verification ' + "'' " + makeid(10) + " ''"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
