const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
    },
    category: {
      type: String,
      enum: ["jeans", "trousers", "tshirts", "shirts", "jackets"],
      required: true,
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      enum: ["Black", "Blue", "White", "Green", "Red"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, 'gender is required'],
    },
    size: {
      type: String,
      enum: ['s', 'm', 'l', 'xl'],
      required: [true, 'size is required'],
    },
    brand: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);
productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);
