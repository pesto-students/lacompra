import { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

import backendDomain from "../../utils/backend";
import "./stripe-btn.styles.scss";
const stripePromise = loadStripe("pk_test_sBHmQKJP8gGI9Id9J9XsAOD900I2ksR5i2");

const StripeCheckoutButton = ({ formValue }) => {
  const isFieldEmpty = () => {
    return Object.keys(formValue).find((key) => formValue[key] === "");
  };
  const handleClick = async (event) => {
    event.preventDefault();
    if (isFieldEmpty()) {
      toast.error(`All fields are required`);
      return;
    }
    const stripe = await stripePromise;
    const response = await fetch(
      `${backendDomain}/api/v1/users/stripeCheckoutSession`,
      {
        method: "GET",
        credentials: "include",
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
      <button type="submit" className="stripe-btn" onClick={handleClick}>
        Checkout
      </button>
    </>
  );
};

export default StripeCheckoutButton;
