import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sidedrawerOpen } from "../sidedrawer/sidedrawerSlice";
import Search from "../search/Search";
import { modalOpen, logoutUser, fetchCurrentUser } from "../modal/modalSlice";
import Dropdown from "../dropdown/Dropdown";

import "./header.styles.scss";
const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.modal);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);
  const handleClickHamburger = () => {
    dispatch(sidedrawerOpen());
  };
  const handleWishlistClick = () => {
    dispatch(sidedrawerOpen("wishlist"));
  };
  const handleCartClick = () => {
    dispatch(sidedrawerOpen("cart"));
  };
  return (
    <header className="header">
      <nav>
        <Link to="/">
          {" "}
          <h1 id="logo">La Compra</h1>
        </Link>

        <Search />
        <button className="hamburger-button" onClick={handleClickHamburger}>
          <div className="hamburger-button__line" />
          <div className="hamburger-button__line" />
          <div className="hamburger-button__line" />
        </button>
        <ul>
          {isLoggedIn && user.role === "admin" && (
            <Link to="/productupload">
              <li>Upload</li>
            </Link>
          )}
          <li className="header_category">
            <span onClick={() => setIsOpen((prev) => !prev)}>Categories</span>
            {isOpen && <Dropdown setIsOpen={setIsOpen} />}
          </li>

          <li onClick={handleCartClick}>
            <a href="#">cart</a>
          </li>
          <li onClick={handleWishlistClick}>
            <a href="#">wishlist</a>
          </li>
          <li>
            {isLoggedIn && (
              <a onClick={() => dispatch(logoutUser())} href="#">
                logout
              </a>
            )}
            {!isLoggedIn && (
              <a onClick={() => dispatch(modalOpen())} href="#">
                login
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
