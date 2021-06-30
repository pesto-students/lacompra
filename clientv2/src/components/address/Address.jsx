// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCartItems, addToCart } from "./cartSlice";
import StripeCheckoutButton from "../stripe-btn/Stripe-btn";
import "./address.styles.scss";

const Address = () => {
  // const dispatch = useDispatch();
  // const { loading, cartItems } = useSelector((state) => state.cart);
  // const { isLoggedIn } = useSelector((state) => state.modal);

  return (
    <section className="address">
      <form>
        <h1>Shipping Details</h1>
        <div className="address_name">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" />
        </div>
        <div className="address_address">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" />
        </div>
        <div className="address_info">
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
        <StripeCheckoutButton />
      </form>
    </section>
  );
};
export default Address;
