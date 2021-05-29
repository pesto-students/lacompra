import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./homepageSlice";

import Hero from "../../components/hero/Hero";
import ProductCarousel from "../../components/productCarousel/ProductCarousel.jsx";
import Testimonial from "../../components/testimonial/Testimonial.jsx";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main>
      <Hero />
      <ProductCarousel />
      <Testimonial />
    </main>
  );
};

export default Homepage;
