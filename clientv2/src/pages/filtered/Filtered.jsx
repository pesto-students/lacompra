import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidedrawerOpen } from "../../components/sidedrawer/sidedrawerSlice";
import Pagination from "../../components/pagination/Pagination";
import "./filtered.styles.scss";

const Filtered = () => {
  const dispatch = useDispatch();
  const { filteredProducts, allResults } = useSelector(
    (state) => state.filterSidedrawer
  );

  // useEffect(() => {
  //   dispatch(fetchfilteredProducts());
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   console.log(filteredProducts);
  // }, [filteredProducts]);
  const handleFilterClick = () => {
    dispatch(sidedrawerOpen("filter"));
  };
  return (
    <section className="filtered">
      <div className="filtered_header">
        <a className="filtered_option" onClick={handleFilterClick}>
          filter / sort
        </a>
        <span>Total {allResults} products found</span>
      </div>
      <div className="filtered_cards">
        {filteredProducts.map((product) => (
          <div
            className="filtered_card"
            key={product.id}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), transparent),url(${product.images[0]})`,
            }}
          >
            <button className="productCarousel carousel__cta">
              View Product
            </button>
            <button
              // onClick={() => dispatch(addToWishlist(slide._id))}
              className="productCarousel carousel__cta"
            >
              Add to wishlist
            </button>
            <h5 className="filtered_title">
              {product.title} by <span>{product.brand}</span>
            </h5>
          </div>
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default Filtered;
