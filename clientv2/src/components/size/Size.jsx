import { useDispatch } from "react-redux";
import { setSizeValue, setCountValue } from "./size.slice";
import "./size.styles.scss";

const Size = ({}) => {
  const dispatch = useDispatch();

  const handleSizeChange = (e) => {
    e.preventDefault();

    dispatch(setSizeValue(e.target.value));
  };

  const handleCountChange = (e) => {
    e.preventDefault();
    dispatch(setCountValue(e.target.value));
  };

  return (
    <div className="productSize">
      <label htmlFor="productSize">Size:</label>
      <select onChange={handleSizeChange} name="productSize" id="productSize">
        <option value="s">s</option>
        <option value="xl">xl</option>
        <option value="l">l</option>
        <option value="m">m</option>
      </select>
      <label htmlFor="productCount">count:</label>
      <select
        onChange={handleCountChange}
        name="productCount"
        id="productCount"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
};

export default Size;
