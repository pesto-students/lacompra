const express = require('express');
const router = express.Router()
const { uploadImages, removeImage } = require('../controllers/cloudinaryController.js');

const { protect, restrictTo } = require('../controllers/authController.js');

router.use(protect, restrictTo('admin'));

router.post('/uploadimages', uploadImages);
router.post('/removeimage', removeImage);

module.exports = router;
