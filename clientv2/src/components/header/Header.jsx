import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sidedrawerOpen } from "../sidedrawer/sidedrawerSlice";
import Search from "../search/Search";
import { modalOpen } from "../modal/modalSlice";
import "./header.styles.scss";
const Header = () => {
  const dispatch = useDispatch();
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
          <li>
            <a href="#">Categories</a>
          </li>
          <li onClick={handleCartClick}>
            <a href="#">cart</a>
          </li>
          <li onClick={handleWishlistClick}>
            <a href="#">wishlist</a>
          </li>
          <li onClick={() => dispatch(modalOpen())}>
            <a href="#">login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
