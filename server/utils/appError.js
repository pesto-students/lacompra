class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    //this is our extented error class
    this.statusCode = statusCode;

    //if statusCode is 400 show fail else 500 error
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    //the error originated here is operational error and not logical/programming error
    this.isOperational = true;

    //https://lucasfcosta.com/2017/02/17/JavaScript-Errors-and-Stack-Traces.html
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
