import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Carousel from "../carousel/Carousel";

import { fetchfilteredProducts } from "../filterSidedrawer/filterSidedrawerSlice";
import { v4 as uuidv4 } from "uuid";
const Hero = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const names = ["jackets", "jeans", "shoe", "tshirt"];
  const handleCategoryClick = (category) => {
    dispatch(
      fetchfilteredProducts({
        category,
        page: 1,
      })
    );
    history.push("/filtered");
  };
  const slides = names.map((name) => {
    return {
      images: [`/img/${name}.jpg`],
      title: name,
      _id: uuidv4(),
    };
  });

  const config = {
    key: "hero",
    handleCategoryClick,
    viewportConfig: {
      skipSnaps: false,
    },
  };
  return <Carousel config={config} slides={slides} />;
};

export default Hero;
