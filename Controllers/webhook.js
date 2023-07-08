require('dotenv').config();
const crypto = require('crypto');
const secret = process.env.SECRET_KEY;


const webhook = (req, res) => {
  //validate event
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
  if (hash == req.headers['x-paystack-signature']) {
  // Retrieve the request's body
  const event = req.body;
  // Do something with event 
  if(event) {
    
    console.log(event.type);
  }
  }
  res.send(200);

}

module.exports = webhook;
