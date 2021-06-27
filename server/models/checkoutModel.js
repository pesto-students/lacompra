const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const checkoutSchema = new mongoose.Schema(
  {
    cart: {
      ref: 'Cart',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    paidBy: {
      type: 'string',
      enum: ['COD', 'paypal', 'stripe']
    },
    status: {
      type: "string",
      required: true
    },
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

module.exports = mongoose.model("Checkout", checkoutSchema);
