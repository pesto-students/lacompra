const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.use(authController.protect);

router.route("/cart").get(userController.getUserCart).post(userController.userCart).delete(userController.emptyCart);

router.route("/wishlist").post(userController.addToWishlist).get(userController.wishlist).delete(userController.removeFromWishlist);

router.patch('/updateMe', userController.updateMe);
router.route('/').get(userController.getAllUsers)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
