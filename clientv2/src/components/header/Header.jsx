import { useDispatch } from "react-redux";
import { sidedrawerOpen } from "../sidedrawer/sidedrawerSlice";

import Search from "../search/Search";

import "./header.styles.scss";
const Header = () => {
  const dispatch = useDispatch();
  const handleClickHamburger = () => {
    dispatch(sidedrawerOpen());
  };
  const handleWishlistClick = () => {
    dispatch(sidedrawerOpen("wishlist"));
  };
  return (
    <header className="header">
      <nav>
        <h1 id="logo">La Compra</h1>
        <Search />
        <button className="hamburger-button" onClick={handleClickHamburger}>
          <div className="hamburger-button__line" />
          <div className="hamburger-button__line" />
          <div className="hamburger-button__line" />
        </button>
        <ul>
          <li>
            <a href="#about">Categories</a>
          </li>
          <li>
            <a href="#cart">cart</a>
          </li>
          <li onClick={handleWishlistClick}>
            <a href="#cart">wishlist</a>
          </li>
          <li>
            <a href="#cart">login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
