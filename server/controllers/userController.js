const { User } = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAysnc = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//Routes handler
exports.getAllUsers = catchAysnc(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = factory.getOne(User);

//do not change password with this
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.updateMe = catchAysnc(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for passwords updates. Please use /updateMyPassword',
        400
      )
    );
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});


exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
