const mongoose = require("mongoose");
// const slugify = require('slugify');

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
    // slug: {
    //   type: String,
    //   unique: true,
    // },
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
    l: {
      type: Number,
      default: 0,
    },
    s: {
      type: Number,
      default: 0,
    },
    xl: {
      type: Number,
      default: 0,
    },
    m: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    ratingsAverage: {
      default: 0,
      type: Number,
      min: [0, 'ratingsAverage must be above 1.0'],
      max: [5, 'ratingsAverage must be below 5.0'],
      //this will run each value is set
      //4.66666 * 10 = 46.6666; Math.round(46.6666) = 47 / 10 = 4.7
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      default: 0,
      type: Number,
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
// productSchema.pre('save', function (next) {
//   this.slug = slugify(this.title, { lower: true });
//   next();
// });

module.exports = mongoose.model("Product", productSchema);
