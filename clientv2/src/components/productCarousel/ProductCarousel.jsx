import Carousel from "../carousel/Carousel";
import "./productCarousel.styles.scss";
const ProductCarousel = () => {
  const config = {
    key: "productCarousel",
    viewportConfig: {
      dragFree: true,
      containScroll: "trimSnaps",
    },
  };
  const slides = ["jacket", "jeans", "shoe", "tshirt"];
  return (
    <section className="productCarousel">
      <h2 className="carouselHeading">Latest Products</h2>
      <Carousel config={config} slides={slides} />
      <h2 className="carouselHeading">Most Popular Products</h2>
      <Carousel config={config} slides={slides} />
    </section>
  );
};
export default ProductCarousel;
