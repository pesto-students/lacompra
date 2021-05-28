import Carousel from "../carousel/Carousel";

const Testimonial = () => {
  const slides = ["jacket", "jeans", "shoe", "tshirt"];
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
