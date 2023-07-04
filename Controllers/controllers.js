require('dotenv').config();
const express = require('express');
const https = require('https');
const axios = require('axios');


const payStack = {

  acceptPayment: async(req, res) => {
    try {

      const email = req.body.email;
      const amount = req.body.amount;
      // params
      const params = JSON.stringify({
        "email": email,
        "amount": amount * 100
      })
      // options
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
      // client request
      const clientReq = https.request(options, apiRes => {
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
      clientReq.write(params)
      clientReq.end()
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }, 
  
  // Verify Payment Controller
  verifyPayment: async(req, res) => {
    try {
      const options = {
        hostname: 'https://api.paystack.co',
        port: 443,
        path: '/transaction/verify/:m42logswb9',
        method: 'GET',
        headers: {
          Authorization: process.env.PUBLIC_KEY
        }
      }

      axios(options)
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response.data);
      }).catch(function (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
      });
      

      // https.request(options, apiRes => {
      //   let data = ''
      
      //   apiRes.on('data', (chunk) => {
      //     data += chunk
      //   });
      
      //   apiRes.on('end', () => {
      //     console.log(JSON.parse(data))
      //     return res.status(200).json(data);
      //   })
      // }).on('error', error => {
      //   console.error(error)
      // })
    } catch (error) {
       // Handle any errors that occur during the request
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
    }
  }
}

const initializePayment = payStack;
module.exports = initializePayment;