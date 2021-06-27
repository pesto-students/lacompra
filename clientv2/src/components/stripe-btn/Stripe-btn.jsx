import { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import backendDomain from "../../utils/backend";
const stripePromise = loadStripe("pk_test_sBHmQKJP8gGI9Id9J9XsAOD900I2ksR5i2");

const StripeCheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    const stripe = await stripePromise;
    const response = await fetch(
      `${backendDomain}/api/v1/users/stripeCheckoutSession`,
      {
        method: "GET",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.data,
    });
    if (result.error) {
      console.log(result);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Checkout</button>
    </>
  );
};

export default StripeCheckoutButton;
