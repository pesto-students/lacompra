import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import backendDomain from "../../utils/backend";
import "./info.styles.scss";
const Info = () => {
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
    <section className="info">
      {" "}
      <div class="card">
        <i class="checkmark">
          {message !== "success" ? (
            <span className="error">&#x2717;</span>
          ) : (
            <span className="success">&#10003;</span>
          )}
        </i>
        <h1 className="heading">{message}</h1>
        <p className="description">Payment {message}</p>
      </div>
    </section>
  );
};

export default Info;
