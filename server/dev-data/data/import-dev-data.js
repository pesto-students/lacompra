const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const { User } = require('../../models/userModel');
const Product = require('../../models/productModel');
const { Review } = require('../../models/reviewModel');
const Cart = require('../../models/cartModel');

var id = mongoose.Types.ObjectId();

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
// const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const carts = JSON.parse(fs.readFileSync(`${__dirname}/carts.json`, 'utf-8'));


//delete data from databse
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    console.log('successful db deleted');
  } catch (error) {
    console.log('error: ', error);
  } finally {
    process.exit(0);
  }
};

const resetData = async () => {
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const word = ["jeans", "trousers", "tshirts", "shirts", "jackets"];
  const gender = ['male', 'female'];
  const color = ["Black", "Blue", "White", "Green", "Red"];
  const brands = ["Louis Philippe", "Van Heusen", "Allen Solly", "Peter England", "Park Avenue", "Monte Carlo", "Belmonte", "Oxemberg", "Provogue", "Indian Terrain"];
  const categories = ["jeans", "trousers", "tshirts", "shirts", "jackets"];

  const products = [];
  for (let i = 0; i < 500; i++) {
    const prod = {
      "user": "5c8a211f2f8fb814b56fa188",
      "_id": mongoose.Types.ObjectId(),
      "sold": randomIntFromInterval(0, 1000),
      "title": word[randomIntFromInterval(0, 4)] + " " + gender[randomIntFromInterval(0, 1)],
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit pretium risus. Phasellus pretium non leo a faucibus. Mauris ullamcorper posuere enim ut ultricies.",
      "price": randomIntFromInterval(1, 1000),
      "color": color[randomIntFromInterval(0, 4)],
      "gender": gender[randomIntFromInterval(0, 1)],
      "brand": brands[randomIntFromInterval(0, brands.length - 1)],
      "s": randomIntFromInterval(0, 50),
      "xl": randomIntFromInterval(0, 50),
      'm': randomIntFromInterval(0, 50),
      "l": randomIntFromInterval(0, 50),
      "category": categories[randomIntFromInterval(0, categories.length - 1)],
      "images": [
        `https://picsum.photos/400?random=${randomIntFromInterval(0, 500)}`,
        `https://picsum.photos/400?random=${randomIntFromInterval(0, 500)}`,
        `https://picsum.photos/400?random=${randomIntFromInterval(0, 500)}`,
        `https://picsum.photos/400?random=${randomIntFromInterval(0, 500)}`,
        `https://picsum.photos/400?random=${randomIntFromInterval(0, 500)}`,
        `https://picsum.photos/400?random=${randomIntFromInterval(0, 500)}`,
      ]
    };
    products.push(prod)
  }

  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();

    await Product.create(products);
    await User.create(users);
    // await Cart.create(carts);
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
