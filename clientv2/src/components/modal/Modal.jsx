import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { loginUser, modalClose, registerUser } from "./modalSlice";

// import Search from "../search/Search";
import "./modal.styles.scss";
const Modal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [currentForm, setCurrentForm] = useState("login");

  const { isLoggedIn, modalState, error } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isLoggedIn) {
      resetForm();
    }
  }, [isLoggedIn]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentForm === "login") {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ email, password, name }));
    }
  };
  const closeModal = () => {
    dispatch(modalClose());
    resetForm();
  };
  const resetForm = () => {
    setEmail("rai@example.com");
    setPassword("password123");
  };
  const handleRegisterClick = () => {
    setCurrentForm("register");
  };
  const handleLoginClick = () => {
    setCurrentForm("login");
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
        {/* <p className="modal__error">{error}</p> */}
        <div className="login-page">
          <div className="form">
            <form
              onSubmit={submitHandler}
              style={{ display: currentForm === "register" ? "block" : "none" }}
              className="register-form"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <button>create</button>
              <p className="message">
                Already registered?{" "}
                <span onClick={handleLoginClick}>Sign In</span>
              </p>
            </form>
            <form
              style={{ display: currentForm === "login" ? "block" : "none" }}
              onSubmit={submitHandler}
              className="login-form"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <button>login</button>
              <p className="message">
                Not registered?{" "}
                <span onClick={handleRegisterClick}>Create an account</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
