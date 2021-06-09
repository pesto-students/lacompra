const AppError = require('../utils/appError');
const catchAysnc = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const { User } = require('../models/userModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel.js');
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


exports.userCart = catchAysnc(async (req, res) => {
  const cart = req.body.products;
  let products = [];

  const user = req.user;
  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();


  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    let items = await Product.findById(cart[i].product, `images title _id price ${cart[i].size}`);

    object.product = {
      images: items.images, title: items.title, id: items._id, size: cart[i].size, count: cart[i].count
    }
    if (items[cart[i].size] == 0) {
      object.product.warning = "Out of stock";
      object.product.outOfStock = true;
      object.product.count = 0;
    } else if (object.product.count > items[cart[i].size]) {
      object.product.warning = "This product is adjusted to maximum quantity available";
      object.product.count = items[cart[i].size];
    }
    object.price = items.price * object.product.count;
    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price;
  }
  const data = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.getUserCart = catchAysnc(async (req, res) => {
  // let cart = await Cart.findOne({ orderdBy: req.user._id }).populate("products.product", "_id title price images");
  let cart = await Cart.findOne({ orderdBy: req.user._id });
  let products = cart?.products;
  let cartTotal = cart?.cartTotal;

  res.status(200).json({
    status: 'success',
    data: { products, cartTotal }
  });
});

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  await Cart.findOneAndRemove({ orderdBy: req.user._id });
  res.status(200).json({
    status: 'success',
    data: {}
  });
};

exports.addToWishlist = catchAysnc(async (req, res) => {
  const { product } = req.body;
  const wishlist = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: product } }, {
    new: true,
    runValidators: true,
  }
  ).select("wishlist").populate("wishlist");
  res.status(200).json({
    status: 'success',
    data: wishlist
  });
});

exports.wishlist = catchAysnc(async (req, res) => {
  const list = await User.findById(req.user._id)
    .select("wishlist")
    .populate("wishlist");
  res.status(200).json({
    status: 'success',
    data: list
  });
});

exports.removeFromWishlist = catchAysnc(async (req, res) => {
  const { product } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: product } }, {
    new: true,
    runValidators: true,
  }
  ).select("wishlist").populate("wishlist");

  res.status(200).json({
    status: 'success',
    data: user
  });
});