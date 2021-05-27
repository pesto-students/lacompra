import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CarouselButtons";
import { useEmblaCarousel as useCarousel } from "embla-carousel/react";
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
      <div className="carousel__viewport" ref={viewportRef}>
        <div className="carousel__container">
          {slides &&
            slides.map((slide) => (
              <div
                className="carousel__slide"
                style={{
                  minWidth: config?.minWidth,
                  height: config?.height,
                }}
                key={slide}
              >
                <div className="carousel__slide__inner">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), transparent),url(img/${slide}.jpg)`,
                    }}
                    className={`${config?.key} carousel__slide_img`}
                  >
                    <section
                      className="carousel__slide__section"
                      style={{
                        height: config?.height,
                        justifyContent:
                          config?.key === "productCarousel"
                            ? "flex-end"
                            : "center",
                      }}
                    >
                      {config?.key === "hero" && (
                        <>
                          <h2 style={{ fontSize: "8rem" }}>
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
