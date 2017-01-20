const express = require('express');

const app = express();

// const path = require('path');
const router = require('./routes.js');


//  TODO: Link Front-End Static Files
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello from the Server!');
});

app.listen(3000, () => {
//  TODO: Delete testing listen function below, uncomment app.listen
  console.log('Example app listening on port 3000!');
});

// app.listen(3000);
