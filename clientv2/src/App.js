//Components
import Header from "./components/header/Header.jsx";
import Hero from "./components/hero/Hero.jsx";
import ProductCarousel from "./components/productCarousel/ProductCarousel.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCarousel />
      </main>
    </>
  );
}

export default App;
