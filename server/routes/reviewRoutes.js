const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

//we are getting below route from productRoutes and merge param lets us access the productId
//so 'POST /product/121323/reviews' because of productRoutes and 'POST /reviews' because of app.js both will come in reviewRoutes
const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
