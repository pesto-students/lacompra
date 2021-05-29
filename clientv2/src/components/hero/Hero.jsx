import Carousel from "../carousel/Carousel";
import { v4 as uuidv4 } from "uuid";
const Hero = () => {
  const names = ["jacket", "jeans", "shoe", "tshirt"];
  const slides = names.map((name) => {
    return {
      images: [`/img/${name}.jpg`],
      title: name,
      _id: uuidv4(),
    };
  });

  const config = {
    key: "hero",
    viewportConfig: {
      skipSnaps: false,
    },
  };
  return <Carousel config={config} slides={slides} />;
};

export default Hero;
