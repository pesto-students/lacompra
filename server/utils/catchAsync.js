module.exports = (fn) => {
  return (req, res, next) => {
    //fn is async and async returns promises.
    //when there is error, promise will be rejected and we 'catch' it instead of catching the error in try catch block
    fn(req, res, next).catch(next); //is same as below
    // fn(req, res, next).catch((err) => next(err));
  };
};
