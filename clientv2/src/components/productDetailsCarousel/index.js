import Carousel from "./ProductDetailsCarousel";

const ProductDetailsCarousel = ({ slides }) => (
  <div className="ProductDetailsCarousel">
    <Carousel slides={slides} />
  </div>
);

export default ProductDetailsCarousel;