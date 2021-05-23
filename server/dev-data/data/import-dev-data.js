const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const { User } = require('../../models/userModel');
const Product = require('../../models/productModel');

//This will read from config.env and save all the variables in nodes process.env
dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

//connect to mongodb
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db conection success');
  });

//read json data
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));


//delete data from databse
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('successful db deleted');
  } catch (error) {
    console.log('error: ', error);
  } finally {
    process.exit(0);
  }
};

const resetData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await Product.create(products);
    await User.create(users);

  } catch (error) {
    console.log('error: ', error);
  } finally {
    process.exit(0);
  }
};

if (process.argv[2] === '---delete') {
  deleteData();
} else {
  resetData();
}
