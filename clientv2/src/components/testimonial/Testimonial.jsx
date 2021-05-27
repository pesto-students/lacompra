import Carousel from "../carousel/Carousel";

const Testimonial = () => {
  const slides = ["jacket", "jeans", "shoe", "tshirt"];
  const config = {
    key: "testimonial",
    height: "60vh",
    minWidth: "100%",
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
