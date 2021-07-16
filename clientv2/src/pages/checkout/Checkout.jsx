import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../../components/cart/Cart";
import Address from "../../components/address/Address";
import "./checkout.styles.scss";

const Checkout = () => {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.modal);

  useEffect(() => {
    if (!isLoggedIn) history.push("/");
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <section className="checkout">
      <h2 className="checkout_headerText">Checkout Page</h2>
      <p className="checkout_headerText">
        please fill and confirm your details and click checkout.
      </p>
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
