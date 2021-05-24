const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review is required'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: false,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'review must belong to a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'title',
  }).populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        //group together by product
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingAverage: 0,
    });
  }
};

reviewSchema.post('save', function (doc, next) {
  this.constructor.calcAverageRatings(this.product);
  next();
});

reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  if (doc) {
    //doc.constructor is the model and so we can access statics methods
    await doc.constructor.calcAverageRating(doc.product);
  }
  next();
});
const Review = mongoose.model('Review', reviewSchema);
exports.reviewSchema = reviewSchema;
exports.Review = Review;