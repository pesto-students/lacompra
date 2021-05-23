const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes.js');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(cors())

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

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRoutes)

app.use(function (req, res, next) {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
