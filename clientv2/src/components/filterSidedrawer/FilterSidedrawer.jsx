import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Range from "../range/Range";
import Star from "../star/Star";
import {
  fetchfilteredProducts,
  updateSortBy,
  updateBrands,
} from "./filterSidedrawerSlice";
import "./filterSidedrawer.styles.scss";

const FilterSidedrawer = () => {
  const dispatch = useDispatch();
  const { rangeValue } = useSelector((state) => state.rangeValue);
  const { sortBy, brands } = useSelector((state) => state.filterSidedrawer);
  const { starsSelected } = useSelector((state) => state.star);

  const [queryObj, setQueryObj] = useState({});

  useEffect(() => {
    if (Object.keys(queryObj).length) {
      dispatch(fetchfilteredProducts(queryObj));
    }
    // eslint-disable-next-line
  }, [queryObj]);

  useEffect(() => {
    setQueryObj((state) => ({
      ...state,
      "price[gte]": rangeValue[0],
      "price[lte]": rangeValue[1],
    }));
  }, [rangeValue]);

  useEffect(() => {
    setQueryObj((state) => ({
      ...state,
      "ratingsAverage[gte]": starsSelected,
    }));
  }, [starsSelected]);

  const handleSortBy = (item) => {
    const queryName = {
      oldest: "-created",
      "most popular": "-sold",
      latest: "created",
    };
    const obj = {};
    if (!sortBy[item]) {
      Object.keys(sortBy).forEach((key) => {
        if (key === item) {
          obj[key] = true;
        } else {
          obj[key] = false;
        }
      });
      setQueryObj({ sort: queryName[item] });
      dispatch(updateSortBy(obj));
    }
  };

  const handleBrandClick = (brand) => {
    const updatedBrands = {
      ...brands,
      [brand]: !brands[brand],
    };
    dispatch(updateBrands(updatedBrands));

    const brandsQuery = Object.keys(updatedBrands).filter((brand) => {
      return !!updatedBrands[brand];
    });
    setQueryObj({ "brand[in]": brandsQuery });
  };
  return (
    <section className="filter">
      <h1>sort/filter</h1>
      <h4>price range:</h4>
      <Range />
      <h4>sort by:</h4>
      <div className="filter_brand filter_sort">
        {Object.keys(sortBy).map((item, i) => {
          return (
            <div key={i} onClick={() => handleSortBy(item)}>
              {item}
            </div>
          );
        })}
      </div>
      <h4>brands:</h4>
      <div className="filter_brands">
        {Object.keys(brands).map((brand) => {
          return (
            <span
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`filter_brand ${brands[brand] ? "filter_active" : ""}`}
            >
              {brand}
            </span>
          );
        })}
      </div>
      <h4>Ratings:</h4>
      <Star />
    </section>
  );
};
export default FilterSidedrawer;
