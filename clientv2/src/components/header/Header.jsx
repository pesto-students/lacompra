import Search from "../search/Search";
import Hamburger from "../hamburger/Hamburger";

import "./header.styles.scss";
const Header = () => {
  return (
    <header className="header">
      <nav>
        <h1 id="logo">La Compra</h1>
        <Search />
        <Hamburger />
        <ul>
          <li>
            <a href="#about">Categories</a>
          </li>
          <li>
            <a href="#cart">cart</a>
          </li>
          <li>
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
