require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const router = require('./Router/route')
const path = require('path')


const port = process.env.PORT || 3001;
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Frontend')))


// Call the routers 
app.use(router);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'Frontend', 'index.html'));
})


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
