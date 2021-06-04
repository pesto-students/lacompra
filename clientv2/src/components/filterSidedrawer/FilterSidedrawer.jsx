import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Range from "../range/Range";
// import { getCartItems, addToCart } from "./filterSidedrawerSlice";
import "./filteredSidedrawer.styles.scss";

const FilterSidedrawer = () => {
  // const dispatch = useDispatch();
  // const { loading, cartItems } = useSelector((state) => state.cart);
  return (
    <section className="filter">
      <h1>sort/filter</h1>
      <Range />
    </section>
  );
};
export default FilterSidedrawer;
