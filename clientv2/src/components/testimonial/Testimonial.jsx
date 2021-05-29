import Carousel from "../carousel/Carousel";
import { v4 as uuidv4 } from "uuid";
const Testimonial = () => {
  const names = ["jacket", "jeans", "shoe", "tshirt"];
  const slides = names.map((name) => {
    return {
      images: [`/img/${name}.jpg`],
      title: name,
      _id: uuidv4(),
    };
  });
  const config = {
    key: "testimonial",
    viewportConfig: {
      skipSnaps: false,
    },
  };
  return (
    <section className="testimonial">
      <h2 className="carouselHeading">Testimonial</h2>
      <Carousel config={config} slides={slides} />
    </section>
  );
};

export default Testimonial;
