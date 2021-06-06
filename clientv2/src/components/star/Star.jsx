import { useSelector, useDispatch } from "react-redux";
import { setStarsSelected } from "./starSlice";
import "./star.styles.scss";
const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick}></div>
);

const StarRating = ({ totalStars }) => {
  const dispatch = useDispatch();
  const { starsSelected } = useSelector((state) => state.star);

  const change = (starsSelected) => {
    dispatch(setStarsSelected(starsSelected));
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => change(i + 1)}
        />
      ))}
      {/* <p>
        {starsSelected} of {totalStars} stars
      </p> */}
      <span className="star_reset" onClick={() => change(0)}>
        reset
      </span>
    </div>
  );
};

export default StarRating;
