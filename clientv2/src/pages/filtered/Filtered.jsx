import { useDispatch, useSelector } from "react-redux";
import { sidedrawerOpen } from "../../components/sidedrawer/sidedrawerSlice";
import Pagination from "../../components/pagination/Pagination";
import { addToWishlist } from "../../components/wishlist/wishlistSlice";
import { addToCart } from "../../components/cart/cartSlice";

import "./filtered.styles.scss";

const Filtered = () => {
  const dispatch = useDispatch();
  const { filteredProducts, allResults } = useSelector(
    (state) => state.filterSidedrawer
  );
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (item) => {
    const cartItemsTransformed = [];
    cartItems.forEach((cartItem) => {
      if (item.id !== cartItem.product.id) {
        cartItemsTransformed.push({
          product: cartItem.product.id,
          count: cartItem.product.count,
          size: cartItem.product.size,
        });
      }
    });
    const sizeAvailable = ["s", "m", "l", "xl"].find((size) => {
      return item[size] > 0;
    });
    cartItemsTransformed.push({
      product: item.id,
      count: 1,
      size: sizeAvailable,
    });
    dispatch(addToCart(cartItemsTransformed));
  };

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
            <button
              className="productCarousel carousel__cta"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
            <button
              onClick={() => dispatch(addToWishlist(product._id))}
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
