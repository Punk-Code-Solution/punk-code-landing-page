const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mail.controller');

router.post('/send-proposta', mailController.sendProposal);

module.exports = router; 