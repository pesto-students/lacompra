const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: true,
      trim: true,
      maxlength: [40, 'name must not more than 40 chars'],
      minlength: [3, 'name must not be less than 10 chars'],
      match: [/^([a-zA-Z0-9 ]+)$/, 'alphanumeric only allowed'],
    },
    email: {
      type: String,
      required: [true, 'must have email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    photo: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['user', 'seller'], //role "admin" should only be assigned through DB
      default: 'user',
      required: false,
    },
    password: {
      type: String,
      required: [true, 'must have password'],
      minlength: 8,
      select: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
exports.User = User;