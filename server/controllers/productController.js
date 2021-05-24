const catchAysnc = require('../utils/catchAsync');
const Product = require('../models/productModel.js');
const factory = require('./handlerFactory');

// @desc    Fetch all products
// @route   GET /products
// @access  Public
// exports.getProducts = catchAysnc(async (req, res) => {
//   // const pageSize = 10
//   // const page = Number(req.query.pageNumber) || 1

//   // const keyword = req.query.keyword
//   //   ? {
//   //     name: {
//   //       $regex: req.query.keyword,
//   //       $options: 'i',
//   //     },
//   //   }
//   //   : {}

//   // const count = await Product.countDocuments({ ...keyword })
//   // const products = await Product.find({ ...keyword })
//   //   .limit(pageSize)
//   //   .skip(pageSize * (page - 1))

//   const products = await Product.find()
//   res.status(200).json(products);
// })
exports.getProducts = factory.getAll(Product);

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
exports.getProductById = catchAysnc(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /products/:id
// @access  Private/Admin
exports.deleteProduct = catchAysnc(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /products
// @access  Private/Admin
exports.createProduct = catchAysnc(async (req, res) => {
  const createdProduct = await new Product(req.body).save();
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /products/:id
// @access  Private/Admin
exports.updateProduct = catchAysnc(async (req, res) => {
  const {
    title,
    description,
    price,
    color,
    gender,
    brand,
    size,
    category
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.title = title
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.size = size
    product.color = color
    product.gender = gender

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    Get top rated products
// @route   GET /products/top
// @access  Public
exports.getTopProducts = catchAysnc(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(10)

  res.json(products)
})

