import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Dropdown from "../dropdown/Dropdown";
import "./search.styles.scss";
const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["jeans", "trousers", "tshirts", "shirts", "jackets"];

  const onInputChange = (e) => {
    const { value } = e.target;

    setInputValue(value);
  };
  return (
    <div className="input-wrapper">
      <input
        onChange={onInputChange}
        placeholder="Search..."
        value={inputValue}
        spellCheck={false}
        onFocus={() => setIsOpen(true)}
      />
      <span className="input-highlight">
        {inputValue.replace(/ /g, "\u00a0")}
      </span>
      {isOpen ? (
        <span className="icon" onClick={() => setIsOpen(false)}>
          X
        </span>
      ) : (
        <IoIosSearch className="icon" />
      )}

      {isOpen && (
        <Dropdown
          setIsOpen={setIsOpen}
          itemsArr={categories}
          inputValue={inputValue}
        />
      )}
    </div>
  );
};

export default Search;
