const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
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
