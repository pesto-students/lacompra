import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import backendDomain from "../../utils/backend";

const Info = () => {
  // const dispatch = useDispatch();
  let { status, id } = useParams();
  const [message, setMessage] = useState("");
  const verifyPayment = async () => {
    const response = await fetch(
      `${backendDomain}/api/v1/users/verifypayment/${id}`,
      {
        method: "GET",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );
    const res = await response.json();
    setMessage(res.status);
  };
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <section>
      {" "}
      <div class="card">
        <div>
          <i class="checkmark">✓</i>
        </div>
        <h1>{message}</h1>
        <p>Payment {message}</p>
      </div>
    </section>
  );
};

export default Info;
