import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist, deleteFromWishlist } from "./wishlistSlice";
import { addToCart } from "../cart/cartSlice";
// import { isLoggedIn } from "../modal/modalSlice";
import "./wishlist.styles.scss";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { cartItems = [] } = useSelector((state) => state.cart);
  const { loading, wishlistItems } = useSelector((state) => state.wishlist);
  const { isLoggedIn } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isLoggedIn) dispatch(getWishlist());
    // eslint-disable-next-line
  }, []);
  const handleMoveToCart = (item) => {
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
    dispatch(deleteFromWishlist(item.id));
  };
  if (!isLoggedIn) return <p className="text_empty">Please login</p>;
  if (loading === "loading") return <div>...loading</div>;
  return (
    <section className="wishlist">
      <h1>wishlist</h1>
      {!wishlistItems.length && <p className="text_empty">Wishlist is empty</p>}
      {wishlistItems.map((item) => (
        <div className="product" key={item.id}>
          <img src={item.images[0]} alt={item.title} />
          <h4>{item.title}</h4>
          <div className="btn">
            <button onClick={() => handleMoveToCart(item)} className="btn_cart">
              move to cart
            </button>
            <button onClick={() => dispatch(deleteFromWishlist(item.id))}>
              remove
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Wishlist;

//TODO
//1) FIX: if user cart is not fetched; it is treated as empty and simply gets replaced by whatever is added by wishlist in it.
//2) add a check for login
