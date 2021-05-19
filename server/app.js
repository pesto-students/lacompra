const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors())
const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

//add time to request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log('headers ', req.headers);
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/', router);
module.exports = app;
