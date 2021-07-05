import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import FileUpload from "../../components/fileUpload/FileUpload";
import { uploadProduct } from "./productUpload.slice";
import ProductCarousel from "../../components/productCarousel/ProductCarousel.jsx";
import { fetchProducts } from "../homepage/homepageSlice";

import "./productUpload.styles.scss";
const ProductUpload = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    price: "",
    color: "",
    gender: "",
    brand: "",
    category: "",
    s: "",
    m: "",
    xl: "",
    l: "",
    sold: "",
  });
  const { images } = useSelector((state) => state.fileUpload);

  const {
    title,
    description,
    price,
    color,
    gender,
    brand,
    category,
    s,
    m,
    xl,
    l,
    sold,
  } = formValue;

  const genders = ["male", "female"];
  const colors = ["Black", "Blue", "White", "Green", "Red"];
  const brands = [
    "Louis Philippe",
    "Van Heusen",
    "Allen Solly",
    "Peter England",
    "Park Avenue",
    "Monte Carlo",
    "Belmonte",
    "Oxemberg",
    "Provogue",
    "Indian Terrain",
  ];
  const categories = ["jeans", "trousers", "tshirts", "shirts", "jackets"];
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    autoPopulate();
  }, [gender, category]);

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const options = (arr) => {
    const opt = [];
    for (let i = 0; i < arr.length; i++) {
      opt.push(
        <option key={arr[i] + i} value={arr[i]}>
          {arr[i]}
        </option>
      );
    }
    return opt;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (images < 4) return toast.error("Images must be 3 or more");
    const emptyField = Object.keys(formValue).find(
      (key) => formValue[key] === ""
    );
    if (emptyField) return toast.error(`${emptyField} cannot be empty`);
    await dispatch(uploadProduct(formValue));
    dispatch(fetchProducts());
  };
  const autoPopulate = () => {
    if (!gender || !category) return;
    console.log("formValue: ", formValue);
    const brand = brands[randomIntFromInterval(0, brands.length - 1)];
    const color = colors[randomIntFromInterval(0, colors.length - 1)];
    const sold = randomIntFromInterval(0, 1000);
    const populatedFields = {
      title: `${gender} ${category} by ${brand}`,
      description: `${gender} ${category} by ${brand}. ${sold} sold in total. Color is ${color}`,
      price: randomIntFromInterval(1, 1000),
      color,
      brand,
      s: randomIntFromInterval(0, 50),
      xl: randomIntFromInterval(0, 50),
      m: randomIntFromInterval(0, 50),
      l: randomIntFromInterval(0, 50),
      sold,
    };
    const imageUrlArr = images.map((image) => image.url);
    setFormValue({ ...formValue, ...populatedFields, images: imageUrlArr });
  };
  return (
    <section>
      <form onSubmit={handleSubmit} className="productupload">
        <FileUpload />
        <div className="productupload_content">
          <div className="productupload_wrapper">
            <label htmlFor="gender">gender: </label>
            <select
              onChange={handleChange}
              value={gender}
              name="gender"
              id="gender"
            >
              {options(genders)}
            </select>
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="category">category: </label>
            <select
              onChange={handleChange}
              value={category}
              name="category"
              id="category"
            >
              {options(categories)}
            </select>
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="title">Title: </label>
            <input
              value={title}
              onChange={handleChange}
              type="text"
              name="title"
              required
              disabled
            />
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="description">Description: </label>
            <input
              value={description}
              onChange={handleChange}
              type="text"
              name="description"
              required
              disabled
            />
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="price">price: </label>
            <input
              value={price}
              onChange={handleChange}
              type="number"
              name="price"
              required
              disabled
            />
          </div>

          <div className="productupload_wrapper">
            <label htmlFor="color">color: </label>
            <select
              disabled
              onChange={handleChange}
              value={color}
              name="color"
              id="color"
            >
              {options(colors)}
            </select>
          </div>

          <div className="productupload_wrapper">
            <label htmlFor="brand">brand: </label>
            <select
              disabled
              onChange={handleChange}
              value={brand}
              name="brand"
              id="brand"
            >
              {options(brands)}
            </select>
          </div>

          <div className="productupload_wrapper">
            <label htmlFor="xl">xl: </label>
            <input
              value={xl}
              onChange={handleChange}
              type="number"
              name="xl"
              required
              disabled
            />
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="l">l: </label>
            <input
              value={l}
              onChange={handleChange}
              type="number"
              name="l"
              required
              disabled
            />
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="s">s: </label>
            <input
              value={s}
              onChange={handleChange}
              type="number"
              name="s"
              required
              disabled
            />
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="m">m: </label>
            <input
              value={m}
              onChange={handleChange}
              type="number"
              name="m"
              required
              disabled
            />
          </div>
          <div className="productupload_wrapper">
            <label htmlFor="sold">sold: </label>
            <input
              value={sold}
              onChange={handleChange}
              type="number"
              name="sold"
              required
              disabled
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ProductCarousel />
    </section>
  );
};

export default ProductUpload;
