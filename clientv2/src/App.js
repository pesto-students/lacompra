//Components
import Header from "./components/header/Header.jsx";
import Hero from "./components/hero/Hero.jsx";
import ProductCarousel from "./components/productCarousel/ProductCarousel.jsx";
import Testimonial from "./components/testimonial/Testimonial.jsx";
import Footer from "./components/footer/Footer.jsx";



function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCarousel />
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}

export default App;
