import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CarouselButtons";
import { useEmblaCarousel as useCarousel } from "embla-carousel/react";
import { FaQuoteLeft } from "react-icons/fa";

import "./carousel.styles.css";
const Carousel = ({ config, slides, children }) => {
  const [viewportRef, carousel] = useCarousel(config?.viewportConfig);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => carousel && carousel.scrollPrev(),
    [carousel]
  );
  const scrollNext = useCallback(
    () => carousel && carousel.scrollNext(),
    [carousel]
  );
  const onSelect = useCallback(() => {
    if (!carousel) return;
    setPrevBtnEnabled(carousel.canScrollPrev());
    setNextBtnEnabled(carousel.canScrollNext());
  }, [carousel]);

  useEffect(() => {
    if (!carousel) return;
    carousel.on("select", onSelect);
    onSelect();
  }, [carousel, onSelect]);

  return (
    <div className="carousel">
      <div className={`${config?.key} carousel__viewport`} ref={viewportRef}>
        <div className="carousel__container">
          {slides &&
            slides.map((slide) => (
              <div className="carousel__slide" key={slide}>
                <div className="carousel__slide__inner">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), transparent),url(img/${slide}.jpg)`,
                    }}
                    className={`${config?.key} carousel__slide_img`}
                  >
                    <section className="carousel__slide__section">
                      {config?.key === "hero" && (
                        <>
                          <h2 className="carousel__slide__heading">
                            Buy Premium <br /> {slide.toUpperCase()}
                          </h2>
                          <button className="hero carousel__cta">
                            shop now
                          </button>
                        </>
                      )}
                      {config?.key === "productCarousel" && (
                        <>
                          <button className="productCarousel carousel__cta">
                            Add to Cart
                          </button>
                          <button className="productCarousel carousel__cta">
                            Add to wishlist
                          </button>
                        </>
                      )}
                      {config?.key === "testimonial" && (
                        <div className={config?.key}>
                          <FaQuoteLeft />

                          <p className="testimonial__text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                          <h2 className="testimonial__person">
                            {config?.name || "Scooby"}
                          </h2>
                        </div>
                      )}
                    </section>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};

export default Carousel;
