import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
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
  const skeleton = () => (
    <div className="productCarousel_skeleton">
      <Skeleton count={3} width={`30%`} height={`40vh`} />
    </div>
  );
  if (loading === "idle" || !allProducts.length || !topProducts.length) {
    return (
      <section className="productCarousel">
        <h2 className="carouselHeading">Latest Products</h2>
        {skeleton()}
        <h2 className="carouselHeading">Most Popular Products</h2>
        {skeleton()}
      </section>
    );
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
