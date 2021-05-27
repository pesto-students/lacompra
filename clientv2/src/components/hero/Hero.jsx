import Carousel from "../carousel/Carousel";

const Hero = () => {
  const slides = ["jacket", "jeans", "shoe", "tshirt"];
  const config = {
    key: "hero",
    height: "95vh",
    minWidth: "100%",
    viewportConfig: {
      skipSnaps: false,
    },
  };
  return <Carousel config={config} slides={slides} />;
};

export default Hero;
