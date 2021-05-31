import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sidedrawerClose } from "./sidedrawerSlice";
import { AiOutlineClose } from "react-icons/ai";
import "./sidedrawer.styles.scss";

import Wishlist from "../wishlist/Wishlist";

const Sidedrawer = () => {
  const dispatch = useDispatch();
  const { status, showComponent: component } = useSelector(
    (state) => state.sidedrawer
  );
  const handleSidedrawer = () => {
    if (status === "open") {
      dispatch(sidedrawerClose());
    }
  };
  useEffect(() => {
    if (status === "open") {
      document.body.style.overflowY = "hidden";
    }

    return () => (document.body.style.overflowY = "auto");
  }, [status]);
  const showComponent = (component) => {
    switch (component) {
      case "wishlist":
        return <Wishlist />;
      // case "cart":
      //   return <Cart />;
      // case "hamburger":
      //   return <Hamburger />;
      // case "filters":
      //   return <Filter />;
      default:
        return "";
    }
  };
  return (
    <div className={`parent ${status === "open" ? "open" : "close"}`}>
      <div className="sidedrawer">
        <AiOutlineClose
          className="sidedrawer_close"
          onClick={handleSidedrawer}
        />
        <div>{status === "open" && showComponent(component)}</div>
      </div>
    </div>
  );
};

export default Sidedrawer;
