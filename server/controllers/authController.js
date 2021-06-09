const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../models/userModel');
const catchAysnc = require('../utils/catchAsync');
const AppError = require('../utils/appError');

function signToken(id) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
      function (err, token) {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
}

const createSendToken = async (user, statusCode, res) => {
  const token = await signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
    },
  });
};
exports.signup = catchAysnc(async (req, res, next) => {
  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm,
  //   passwordChangedAt: req.body.passwordChangedAt,
  // });
  // console.log('newUser: ', newUser);
  const newUser = await User.create(req.body);
  console.log('newUser: ', newUser);

  createSendToken(newUser, 201, res);
});

exports.login = catchAysnc(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter a valid email and password', 400));
  }
  const user = await User.findOne({ email: `${email}` }).select('+password');
  if (!user || !(await user.correctPassword(`${password}`, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = catchAysnc(async (req, res, next) => {
  let token;
  if (
    req.headers.cookie &&
    req.headers.cookie.startsWith('jwt')
  ) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) {
    return next(new AppError('User is not logged in.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError('The user belonging to this token does not exist.', 401)
    );
  }

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  //roles is array ['admin','user']
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`Your role '${req.user.role}' is not authorized`, 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAysnc(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('your current password is incorrect', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();
  createSendToken(user, 200, res);
});

exports.logout = catchAysnc(async (req, res, next) => {
  console.log('req: ');
  res.clearCookie('jwt');
  res.status(200).json({ status: "success" });
})