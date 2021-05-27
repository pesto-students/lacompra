import Carousel from "../carousel/Carousel";
import "./productCarousel.styles.scss";
const ProductCarousel = () => {
  const config = {
    key: "productCarousel",
    height: "40vh",
    minWidth: "33.33%",
    viewportConfig: {
      skipSnaps: false,
      slidesToScroll: 3,
    },
  };
  const slides = ["jacket", "jeans", "shoe", "tshirt"];
  return (
    <section className="productCarousel">
      <h2 className="heading">Latest Products</h2>
      <Carousel config={config} slides={slides} />
      <h2 className="heading">Most Popular Products</h2>
      <Carousel config={config} slides={slides} />
    </section>
  );
};
export default ProductCarousel;
