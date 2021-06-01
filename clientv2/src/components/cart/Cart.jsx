import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, addToCart } from "./cartSlice";
import "./cart.styles.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const { loading, cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
    // eslint-disable-next-line
  }, []);

  const removeFromCart = (idToRemove) => {
    const filteredCart = [];
    cartItems.forEach((item) => {
      if (item._id !== idToRemove) {
        filteredCart.push({
          product: item.product.id,
          count: item.count,
        });
      }
    });
    dispatch(addToCart(filteredCart));
  };

  if (loading === "loading") return <div>...loading</div>;

  console.log("cartItems: ", cartItems);
  return (
    <section className="cart">
      <h1>cart</h1>
      {!cartItems.length && <p className="text_empty">Cart is empty</p>}
      {cartItems.map((item) => (
        <div className="product" key={item.product.id}>
          <img src={item.product.images[0]} alt={item.product.title} />
          <h4>{item.product.title}</h4>

          <div className="btn">
            <div className="btn_cart">
              <label htmlFor="size">Size:</label>
              <select name="size" id="size">
                <option value="s">s</option>
                <option value="xl">xl</option>
                <option value="l">l</option>
                <option value="m">m</option>
              </select>
            </div>
            <div className="btn_cart">
              <label htmlFor="quatity">quatity:</label>
              <select name="quatity" id="quatity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <button onClick={() => removeFromCart(item._id)}>remove</button>
          </div>
        </div>
      ))}
    </section>
  );
};
export default Cart;
// onClick={() => dispatch(deleteFromCart(item.id))}
