const express = require('express');

const app = express();

// const path = require('path');
const router = require('./routes.js');


//  TODO: Link Front-End Static Files
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).end('Hello from the Server!');
});

app.listen(3000);
