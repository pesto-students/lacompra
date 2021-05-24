const express = require('express');
const userContoller = require('../controllers/userController');
const authContoller = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authContoller.signup);
router.post('/login', authContoller.login);

router.patch(
  '/updateMyPassword',
  authContoller.protect,
  authContoller.updatePassword
);

router.get(
  '/me',
  authContoller.protect,
  userContoller.getMe,
  userContoller.getUser
);

router.use(authContoller.protect);

router.patch('/updateMe', userContoller.updateMe);

router.route('/').get(userContoller.getAllUsers)

router
  .route('/:id')
  .get(userContoller.getUser)
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser);

module.exports = router;
