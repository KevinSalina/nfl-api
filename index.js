const express = require('express');
const app = express();

// Require
const teams = require('./teams');


// Setting up port
app.listen(3000, () => {
  console.log('Server listening on port 3000 :)')
})
