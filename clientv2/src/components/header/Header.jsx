import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sidedrawerOpen } from "../sidedrawer/sidedrawerSlice";
import Search from "../search/Search";
import { modalOpen, logoutUser, fetchCurrentUser } from "../modal/modalSlice";
import "./header.styles.scss";
const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.modal);

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
          <Link to="/filtered">
            <li>Categories</li>
          </Link>

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
