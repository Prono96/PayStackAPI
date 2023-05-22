require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./Router/route')



const port = process.env.PORT || 3001;
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Call the routers 
app.use(router);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});