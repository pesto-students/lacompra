import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidedrawerOpen } from "../../components/sidedrawer/sidedrawerSlice";
import Pagination from "../../components/pagination/Pagination";
import "./filtered.styles.scss";

const Filtered = () => {
  const dispatch = useDispatch();
  const { filteredProducts, allResults } = useSelector(
    (state) => state.filterSidedrawer
  );

  // useEffect(() => {
  //   dispatch(fetchfilteredProducts());
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   console.log(filteredProducts);
  // }, [filteredProducts]);
  const handleFilterClick = () => {
    dispatch(sidedrawerOpen("filter"));
  };
  return (
    <section className="filtered">
      <div className="filtered_header">
        <span onClick={handleFilterClick}>filter/sort</span>
        <span>Total {allResults} products found</span>
      </div>
      <div className="filtered_cards">
        {filteredProducts.map((product) => (
          <div className="filtered_card" key={product.id}>
            <div>brand: {product.brand}</div>
            <div>title: {product.title}</div>
            <div>description: {product.description}</div>
          </div>
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default Filtered;
