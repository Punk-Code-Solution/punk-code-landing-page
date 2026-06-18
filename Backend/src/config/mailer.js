const nodemailer = require('nodemailer');

function assertMailConfigured() {
  if (!process.env.CLIENT_EMAIL || !process.env.CLIENT_PASS) {
    const error = new Error('MAIL_NOT_CONFIGURED');
    error.code = 'MAIL_NOT_CONFIGURED';
    throw error;
  }
}

function createTransporter() {
  assertMailConfigured();

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.CLIENT_EMAIL,
      pass: process.env.CLIENT_PASS,
    },
  });
}

module.exports = {
  assertMailConfigured,
  createTransporter,
}; 
