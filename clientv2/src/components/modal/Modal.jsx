import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { loginUser, modalClose } from "./modalSlice";

// import Search from "../search/Search";
import "./modal.styles.scss";
const Modal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { isLoggedIn, modalState, error } = useSelector((state) => state.modal);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, username }));
  };
  const closeModal = () => {
    dispatch(modalClose());
  };
  return (
    <div
      style={{ display: modalState === "close" ? "none" : "" }}
      className="modal"
      tabIndex="0"
    >
      <div className="modal__content">
        <h1 className="modal__title">Login</h1>
        <span onClick={closeModal} className="modal__close">
          <AiOutlineClose />
        </span>
        <p className="modal__error">{error}</p>
        <div className="login-page">
          <div className="form">
            <form className="register-form">
              <input type="text" placeholder="name" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="email address" />
              <button>create</button>
              <p className="message">
                Already registered? <a href="#">Sign In</a>
              </p>
            </form>
            <form onSubmit={submitHandler} className="login-form">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <button>login</button>
              <p className="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
