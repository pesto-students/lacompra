import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Range from "../range/Range";
import { fetchfilteredProducts } from "./filterSidedrawerSlice";
import "./filterSidedrawer.styles.scss";

const FilterSidedrawer = () => {
  const dispatch = useDispatch();
  const { rangeValue } = useSelector((state) => state.rangeValue);
  const [queryObj, setQueryObj] = useState({});

  useEffect(() => {
    console.log("queryObj: ", queryObj);
    dispatch(fetchfilteredProducts(queryObj));

    // eslint-disable-next-line
  }, [queryObj]);

  useEffect(() => {
    setQueryObj((state) => ({
      ...state,
      "price[gte]": rangeValue[0],
      "price[lte]": rangeValue[1],
    }));
  }, [rangeValue]);

  return (
    <section className="filter">
      <h1>sort/filter</h1>
      <Range />
    </section>
  );
};
export default FilterSidedrawer;
