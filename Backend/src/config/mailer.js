const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CLIENT_EMAIL,
    pass: process.env.CLIENT_PASS
  }
});

module.exports = transporter; 
