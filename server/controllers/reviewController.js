const { Review } = require('../models/reviewModel');
const catchAysnc = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review);
exports.createReview = catchAysnc(async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
