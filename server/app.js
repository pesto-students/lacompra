const express = require('express');
const morgan = require('morgan');

const app = express();

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

app.use('/', (req, res, next) => {
  res.send("hello all")
});
module.exports = app;
