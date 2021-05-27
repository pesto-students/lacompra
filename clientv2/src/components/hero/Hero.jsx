import Carousel from "../carousel/Carousel";

const slides = ["jacket", "jeans", "shoe", "tshirt"];
const Hero = () => (
  <main>
    <Carousel slides={slides} />
  </main>
);

export default Hero;
