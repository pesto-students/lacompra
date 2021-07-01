import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCartItems, addToCart } from "./cartSlice";
import StripeCheckoutButton from "../stripe-btn/Stripe-btn";
import "./address.styles.scss";

const Address = () => {
  const [formValue, setFormValue] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const { fullName, address, city, state, zip } = formValue;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <section className="address">
      <form>
        <h1>Shipping Details</h1>
        <div className="address_name">
          <label htmlFor="fullName">Full Name</label>
          <input
            value={fullName}
            onChange={handleChange}
            type="text"
            name="fullName"
            required
          />
        </div>
        <div className="address_address">
          <label htmlFor="address">Address</label>
          <input
            value={address}
            onChange={handleChange}
            type="text"
            name="address"
            required
          />
        </div>
        <div className="address_info">
          <div>
            <label htmlFor="city">City</label>
            <input
              value={city}
              onChange={handleChange}
              type="text"
              name="city"
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              value={state}
              onChange={handleChange}
              type="text"
              name="state"
              required
            />
          </div>
          <div>
            <label htmlFor="zip">Zip</label>
            <input
              value={zip}
              onChange={handleChange}
              type="text"
              name="zip"
              required
            />
          </div>
        </div>
        <StripeCheckoutButton formValue={formValue} />
      </form>
    </section>
  );
};
export default Address;
