import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CarouselButtons";
import { useEmblaCarousel as useCarousel } from "embla-carousel/react";
import "./carousel.styles.css";
const Carousel = ({ slides, children }) => {
  console.log("slides: ", slides);
  const [viewportRef, carousel] = useCarousel({ skipSnaps: false });
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
      <div className="carousel__viewport" ref={viewportRef}>
        <div className="carousel__container">
          {slides &&
            slides.map((slide) => (
              <div className="carousel__slide" key={slide}>
                <div className="carousel__slide__inner">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), transparent),url(img/${slide}.jpg)`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      filter: "grayscale(1)",
                    }}
                  >
                    <section
                      style={{
                        height: "95vh",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <h2 style={{ fontSize: "8rem" }}>
                        Buy Premium <br /> {slide.toUpperCase()}
                      </h2>
                      <button className="carousel_cta">shop now</button>
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
