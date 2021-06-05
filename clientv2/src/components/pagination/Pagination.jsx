import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchfilteredProducts } from "../filterSidedrawer/filterSidedrawerSlice";
import "./pagination.styles.scss";
const Pagination = () => {
  const dispatch = useDispatch();
  const allResults = useSelector((state) => state.filterSidedrawer.allResults);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchfilteredProducts({ page: currentPage }));
    //eslint-disable-next-line
  }, [currentPage]);

  let maxPages = Math.ceil(allResults / 15);
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className="flex-container">
      <div>
        {" "}
        current page :{" "}
        {currentPage > maxPages
          ? maxPages && setCurrentPage(maxPages)
          : currentPage}{" "}
      </div>

      <div className="paginate-ctn">
        <div className="round-effect" onClick={prevPage}>
          {" "}
          &lsaquo;{" "}
        </div>
        {items}
        <div className="round-effect" onClick={nextPage}>
          {" "}
          &rsaquo;{" "}
        </div>
      </div>
    </div>
  );
  return paginationRender;
};

export default Pagination;
