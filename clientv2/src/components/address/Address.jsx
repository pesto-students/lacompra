// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCartItems, addToCart } from "./cartSlice";
import "./address.styles.scss";

const Address = () => {
  // const dispatch = useDispatch();
  // const { loading, cartItems } = useSelector((state) => state.cart);
  // const { isLoggedIn } = useSelector((state) => state.modal);

  return (
    <section className="address">
      <form>
        <h1>
          <i className="fas fa-shipping-fast"></i>
          Shipping Details
        </h1>
        <div className="name">
          <div>
            <label htmlFor="f-name">First</label>
            <input type="text" name="f-name" />
          </div>
          <div>
            <label htmlFor="l-name">Last</label>
            <input type="text" name="l-name" />
          </div>
        </div>
        <div className="street">
          <label htmlFor="name">Street</label>
          <input type="text" name="address" />
        </div>
        <div className="address-info">
          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" />
          </div>
          <div>
            <label htmlFor="zip">Zip</label>
            <input type="text" name="zip" />
          </div>
        </div>
        <div className="btns">
          <button>Purchase</button>
        </div>
      </form>
    </section>
  );
};
export default Address;
