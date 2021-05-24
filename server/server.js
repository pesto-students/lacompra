const dotenv = require('dotenv');
const mongoose = require('mongoose');

//uncaught exceptions handler
//uncaught exceptions occurs when there is error in synchronous code
//example : console.log(x); where 'x' is not defined
process.on('uncaughtException', (err) => {
  console.log('err: ', err);
  console.log('======= server shut down : UNCAUGHT EXCEPTION =======');
  console.log('name: ', err.name);
  console.log('message: ', err.message);

  process.exit(1);
});

//This will read from config.env and save all the variables in nodes process.env
dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
//connect to mongodb
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB conection success');
  });

//app file is required after config.env because app.js require access to env variables
const app = require('./app');


const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`working on port ${port} and mode is ${process.env.NODE_ENV}`);
});

//asyncronous code error handler
//unhandleRejection promise rejection occurs when async promise is rejected without try catch block or .catch()
//example above, DB connection error if password is incorrect
//every time there is unhandled promise rejection error 'unhandleRejection' is emitted.
//We can suscribe it by .on()
//this works like safety net if we forget tryCatch block over promise
process.on('unhandledRejection', (err) => {
  console.log('err: ', err);
  console.log('======= server shut down : UNHANDLED REJECTION =======');
  console.log('name: ', err.name);
  console.log('message: ', err.message);

  //by doing server.close server first resolves remaining res and req
  server.close(() => {
    //abrupt way to shut down server
    //0 means success and 1 means uncaught exceptions
    process.exit(1);
  });
});
