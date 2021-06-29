import { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { Thumb } from "./ProductDetailsThumb";
import "./productDetailsCarousel.styles.scss";

const EmblaCarousel = ({ slides = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: "",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs | !slides.length) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs | !slides.length) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla | !slides.length) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);
  if (!slides.length) return null;

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={mainViewportRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div
                  style={{
                    backgroundImage: `url(${slide})`,
                  }}
                  className="embla__slide__inner"
                >
                  {/* <img
                    className="embla__slide__img"
                    src={slide}
                    alt="A dress"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla embla--thumb">
        <div className="embla__viewport" ref={thumbViewportRef}>
          <div className="embla__container embla__container--thumb">
            {slides.map((slide, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={slide}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
