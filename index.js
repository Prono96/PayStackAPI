require('dotenv').config()
const express = require('express');
const app = express();
const router = require('./Router/route')



const port = process.env.PORT || 8000;


app.use(router);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});