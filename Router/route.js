const express = require('express');
const router = express.Router();
const initializePayment = require('../Controllers/controllers');


router.post('/acceptpayment', initializePayment.acceptPayment);
router.get('/verifypayment', initializePayment.verifyPayment);

module.exports = router