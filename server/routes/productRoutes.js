const express = require('express');
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
} = require('../controllers/productController.js')
const { protect, restrictTo } = require('../controllers/authController.js')

router.route('/').get(getProducts).post(protect, createProduct)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, restrictTo('admin'), deleteProduct)
  .put(protect, updateProduct)

module.exports = router;
