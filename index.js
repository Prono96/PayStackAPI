require('dotenv').config()
const express = require('express');
const app = express();
const https = require('https')
// const axios = require('axios');

const port = process.env.PORT || 8000;


app.post('/paystack', async (req, res) => {
  try {
    const params = JSON.stringify({
      "email": "promiseprince01@gmail.com",
      "amount": 2000 * 100
    })
    
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: process.env.PUBLIC_KEY,
        'Content-Type': 'application/json'
      }
    }
    
    const req = https.request(options, apiRes => {
      let data = ''
    
      apiRes.on('data', (chunk) => {
        data += chunk
      });
    
      apiRes.on('end', () => {
        console.log(JSON.parse(data));
        return res.status(200).json(data);
      })
    }).on('error', error => {
      console.error(error)
    })
    
    req.write(params)
    req.end()
    
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});