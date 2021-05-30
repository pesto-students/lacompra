import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "./productCarouselSlice";

import Carousel from "../carousel/Carousel";
import "./productCarousel.styles.scss";
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, topProducts } = useSelector((state) => state.topProducts);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  const config = {
    key: "productCarousel",
    viewportConfig: {
      dragFree: true,
      containScroll: "trimSnaps",
    },
  };

  // 10 latest products
  const latestProducts = () => {
    return allProducts?.slice(0, 10);
  };

  if (loading === "idle" || !allProducts.length || !topProducts.length) {
    return <div>Loading...</div>;
  }
  return (
    <section className="productCarousel">
      <h2 className="carouselHeading">Latest Products</h2>
      <Carousel config={config} slides={latestProducts()} />
      <h2 className="carouselHeading">Most Popular Products</h2>
      <Carousel config={config} slides={topProducts} />
    </section>
  );
};
export default ProductCarousel;
