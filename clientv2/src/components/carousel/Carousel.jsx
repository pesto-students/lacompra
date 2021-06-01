import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CarouselButtons";
import { useEmblaCarousel as useCarousel } from "embla-carousel/react";
import { FaQuoteLeft } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { addToWishlist } from "../wishlist/wishlistSlice";
import "./carousel.styles.css";

const Carousel = ({ config, slides }) => {
  const dispatch = useDispatch();
  // const { wishlistItems } = useSelector((state) => state.wishlist);

  const [viewportRef, carousel] = useCarousel(config?.viewportConfig);
  const Image = ({ src, componentName, children }) => {
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), transparent),url(${src})`,
        }}
        className={`${componentName} carousel__slide_img`}
      >
        {children}
      </div>
    );
  };
  return (
    <div className="carousel">
      <div className={`${config?.key} carousel__viewport`} ref={viewportRef}>
        <div className="carousel__container">
          {slides.length &&
            slides.map((slide) => {
              return (
                <div className="carousel__slide" key={slide._id}>
                  <div className="carousel__slide__inner">
                    <Image src={slide?.images?.[0]} componentName={config?.key}>
                      <section className="carousel__slide__section">
                        {config?.key === "hero" && (
                          <>
                            <h2 className="carousel__slide__heading">
                              Buy Premium <br /> {slide.title.toUpperCase()}
                            </h2>
                            <button className="hero carousel__cta">
                              shop now
                            </button>
                          </>
                        )}
                        {config?.key === "productCarousel" && (
                          <>
                            <button className="productCarousel carousel__cta">
                              View Product
                            </button>
                            <button
                              onClick={() => dispatch(addToWishlist(slide._id))}
                              className="productCarousel carousel__cta"
                            >
                              {/* {!!wishlistItems.find(
                                (wishlistItem) => wishlistItem._id === slide._id
                              )
                                ? "Remove"
                                : "Add to wishlist"} */}
                              Add to wishlist
                            </button>
                            <h4 className={`${config.key} title`}>
                              {slide?.title}
                            </h4>
                          </>
                        )}
                        {config?.key === "testimonial" && (
                          <div className={config?.key}>
                            <FaQuoteLeft />

                            <p className="testimonial__text">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                            <h2 className="testimonial__person">
                              {config?.name || "Scooby"}
                            </h2>
                          </div>
                        )}
                      </section>
                    </Image>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <CarouselBtn carousel={carousel} />
    </div>
  );
};

//made it in a seperate component to prevent re downloading of images of parent component on every re-render.
const CarouselBtn = ({ carousel }) => {
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
    <>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </>
  );
};

export default Carousel;
