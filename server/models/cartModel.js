const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          id: {
            type: ObjectId,
            required: true,
            ref: 'Product'
          },
          images: [String],
          title: String,
          size: {
            type: String,
            enum: ['xl', 's', 'l', 'm']
          },
          count: Number,
          warning: {
            type: String,
            default: ""
          },
          outOfStock: {
            type: Boolean,
            required: true,
            default: false
          }
        },
        price: Number,
      },
    ],
    cartTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
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

module.exports = mongoose.model("Cart", cartSchema);
