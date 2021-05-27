import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import "./search.styles.scss";
const Search = () => {
  const [inputValue, setInputValue] = useState("");

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
      />
      <span className="input-highlight">
        {inputValue.replace(/ /g, "\u00a0")}
      </span>
      <IoIosSearch className="icon" />
    </div>
  );
};

export default Search;
