import { useSelector, useDispatch } from "react-redux";
import { sidedrawerClose } from "./sidedrawerSlice";
import { AiOutlineClose } from "react-icons/ai";
import "./sidedrawer.styles.scss";

const Sidedrawer = ({ children }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.sidedrawer.status);
  const handleSidedrawer = () => {
    if (status === "open") {
      dispatch(sidedrawerClose());
    }
  };
  return (
    <div className={`parent ${status === "open" ? "open" : "close"}`}>
      <div className="sidedrawer">
        <AiOutlineClose
          className="sidedrawer_close"
          onClick={handleSidedrawer}
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Sidedrawer;
