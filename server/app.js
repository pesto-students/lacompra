const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes.js');
const reviewRouter = require('./routes/reviewRoutes');
const cloudinaryRouter = require('./routes/cloudinaryRoutes');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors({
  origin: ['https://lacompra-beta.netlify.app/'], credentials: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '1mb' }));

//add time to request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log('headers ', req.headers);
  next();
});



app.options('*', cors()) // include before other routes 

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/cloudinary', cloudinaryRouter);


app.use('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' })
});

app.use(function (req, res, next) {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
