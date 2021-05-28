import Carousel from "../carousel/Carousel";

const Hero = () => {
  const slides = ["jacket", "jeans", "shoe", "tshirt"];
  const config = {
    key: "hero",
    viewportConfig: {
      skipSnaps: false,
    },
  };
  return <Carousel config={config} slides={slides} />;
};

export default Hero;
