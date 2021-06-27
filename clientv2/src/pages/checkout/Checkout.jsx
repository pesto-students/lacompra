import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/cart/Cart";
import Address from "../../components/address/Address";
import "./checkout.styles.scss";

const Checkout = () => {
  // const dispatch = useDispatch();

  return (
    <section className="checkout">
      <h2>Checkout Page</h2>
      <p>please fill and confirm your details and click checkout.</p>
      <div className="checkout_wrapper">
        <div className="checkout_cart">
          <Cart />
        </div>
        <Address />
      </div>
    </section>
  );
};

export default Checkout;
