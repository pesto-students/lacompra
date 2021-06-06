import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Range as Slider, getTrackBackground } from "react-range";
import { setRangeValue } from "./rangeSlice";
const STEP = 1;
const MIN = 1;
const MAX = 1000;

const Range = () => {
  const dispatch = useDispatch();
  const { rangeValue } = useSelector((state) => state.rangeValue);
  const [values, setValues] = useState(rangeValue);
  if (!rangeValue?.length) return <div>loading</div>;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Slider
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(value) => {
          setValues(value);
        }}
        onFinalChange={(value) => {
          dispatch(setRangeValue(value));
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "16px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#4b5563", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "5px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: "20px" }} id="output">
        <span>Price: </span>
        {values[0]} - {values[1]}
      </output>
    </div>
  );
};

export default Range;
