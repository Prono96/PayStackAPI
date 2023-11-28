require('dotenv').config();
const express = require('express');
const https = require('https');
const axios = require('axios');


const payStack = {

  acceptPayment: async (req, res) => {
    try {

      const { email, amount } = req.body;
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
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
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
        return res.status(400).json(error.message);
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
  verifyPayment: async (req, res) => {
    const reference = req.params.reference
    try {
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY}`
        }
      }


      const apiReq = https.request(options, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
          data += chunk;
        });

        apiRes.on('end', () => {
          console.log(JSON.parse(data));
          return res.status(200).json(data);
        });
      });

      apiReq.on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      });

      // End the request
      apiReq.end();

    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  chargeCard: async (req, res) => {
    try {
      let { email, amount, authorization_code } = req.body;

      const params = JSON.stringify({
        "email": email,
        "amount": amount * 100,
        "authorization_code": authorization_code
      })

      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/charge_authorization',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }

      const request = https.request(options, apiRes => {
        let data = ''

        apiRes.on('data', (chunk) => {
          data += chunk
        });

        apiRes.on('end', () => {
          console.log(JSON.parse(data))
          res.status(200).json(JSON.parse(data));
        })
      }).on('error', error => {
        console.error(error.message)
        res.status(500).json(error.message)
      })

      request.write(params)
      request.end()
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  // End of controller
}

const initializePayment = payStack;
module.exports = initializePayment;