var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'randychan35@gmail.com',
    pass: 'ehvdovnblfkpenzy'
  }
});

var mailOptions = {
  from: 'randychan35@gmail.com',
  to: 'wahyupratamaa2121@gmail.com',
  subject: 'INSTATON',
  text: 'Terima Kasih telah mendaftar.'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});