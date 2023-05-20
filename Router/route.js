const express = require('express');
const router = express.Router();
const initializePayment = require('../Controllers/controllers');


router.post('/paystack', initializePayment.acceptPayment)

module.exports = router