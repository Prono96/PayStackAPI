const express = require('express');
const router = express.Router();
const initializePayment = require('../Controllers/controllers');
const useWebHook = require('../Controllers/webhook')


router.post('/acceptpayment', initializePayment.acceptPayment);
router.post('/webhook', useWebHook)
router.get('/verifypayment', initializePayment.verifyPayment);

module.exports = router