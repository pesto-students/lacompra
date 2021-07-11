import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchfilteredProducts } from "../filterSidedrawer/filterSidedrawerSlice";
import "./dropdown.styles.scss";

const Dropdown = ({ itemsArr, inputValue = "", setIsOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const filteredArr = itemsArr.filter((item) => item.includes(inputValue));

  const handleDropdownClick = (item) => {
    dispatch(
      fetchfilteredProducts({
        category: item,
        page: 1,
      })
    );
    history.push("/filtered");
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      {filteredArr.map((item) => (
        <div onClick={() => handleDropdownClick(item)} key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
