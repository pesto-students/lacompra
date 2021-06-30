import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCartItems, addToCart } from "./cartSlice";
import { sidedrawerClose } from "../sidedrawer/sidedrawerSlice";

import "./cart.styles.scss";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, cartItems, cartTotal } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCartItems());
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const removeFromCart = (idToRemove) => {
    const filteredCart = [];
    cartItems.forEach((item) => {
      if (item._id !== idToRemove) {
        filteredCart.push({
          product: item.product.id,
          count: item.product.count,
          size: item.product.size,
        });
      }
    });
    dispatch(addToCart(filteredCart));
  };
  const handleSizeChange = (e, id) => {
    e.preventDefault();
    const filteredCart = [];
    cartItems.forEach((item) => {
      const cart = {
        product: item.product.id,
        count: item.product.count < 1 ? 1 : item.product.count,
      };
      if (item.product.id === id) {
        cart.size = e.target.value;
      } else {
        cart.size = item.product.size;
      }
      filteredCart.push(cart);
    });
    dispatch(addToCart(filteredCart));
  };

  const handleQuantityChange = (e, id) => {
    e.preventDefault();
    const filteredCart = [];
    cartItems.forEach((item) => {
      const cart = {
        product: item.product.id,
        size: item.product.size,
      };
      if (item.product.id === id) {
        cart.count = e.target.value;
      } else {
        cart.count = item.product.count;
      }
      filteredCart.push(cart);
    });
    dispatch(addToCart(filteredCart));
  };
  const Options = () => {
    const options = [];
    for (let i = 1; i <= 4; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  const handleProceedClick = () => {
    dispatch(sidedrawerClose());
    history.push("/checkout");
  };
  if (!isLoggedIn) return <p className="text_empty">Please login</p>;
  if (loading === "loading") return <div>...loading</div>;
  return (
    <section className="cart">
      <h1>cart</h1>

      {cartItems?.map((item) => (
        <div className="product" key={item.product.id}>
          <img src={item.product.images[0]} alt={item.product.title} />
          <h4>{item.product.title}</h4>
          <h5 className="warning">{item.product.warning}</h5>
          <div className="btn">
            <div className="btn_cart">
              <label htmlFor="size">Size:</label>
              <select
                defaultValue={item.product.size}
                onChange={(e) => handleSizeChange(e, item.product.id)}
                name="size"
                id="size"
              >
                <option value="s">s</option>
                <option value="xl">xl</option>
                <option value="l">l</option>
                <option value="m">m</option>
              </select>
            </div>
            {item.product.count !== 0 && (
              <div className="btn_cart">
                <label htmlFor="quatity">Quatity:</label>
                <select
                  onChange={(e) => handleQuantityChange(e, item.product.id)}
                  value={item.product.count}
                  name="quatity"
                  id="quatity"
                >
                  <Options />
                </select>
              </div>
            )}

            <button
              className="cart_removeCta"
              onClick={() => removeFromCart(item._id)}
            >
              remove
            </button>
          </div>
        </div>
      ))}
      {!cartItems?.length ? (
        <p className="text_empty">Cart is empty</p>
      ) : (
        <div className="cart_footer">
          <p className="cart_price">Total Price: ₹ {cartTotal}</p>
          <button onClick={handleProceedClick} className="cart_checkoutCta">
            Proceed to checkout
          </button>
          {/* <StripeCheckoutButton /> */}
        </div>
      )}
    </section>
  );
};
export default Cart;
