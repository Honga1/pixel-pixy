import { useEffect, useState } from "react";
import { getRelativeClickPosition } from "../drivers/getRelativeClickPosition";
import { RGBColor } from "../drivers/RGBColor";
import "../styles/ColorPickerSwatch.css";
export const ColorPickerSwatch = ({
  selectedColor,
  onColorPicked,
}: {
  selectedColor: RGBColor;
  onColorPicked: (color: RGBColor) => void;
}) => {
  const [currentHSL, setCurrentHSL] = useState(() => {
    const hsl = selectedColor.toHSL();

    return hsl;
  });

  useEffect(() => {
    const hsl = selectedColor.toHSL();
    if (hsl) {
      setCurrentHSL(hsl);
    }
  }, [selectedColor]);

  return (
    <div className="Wrapper">
      <div
        style={{ backgroundColor: `hsl(${currentHSL.h}, 100%, 50%)` }}
        className="ColorPickerSwatch"
      >
        <div
          className="Saturation"
          onTouchEnd={(event) => {
            const {
              relativeX: scaledX,
              relativeY: scaledY,
            } = getRelativeClickPosition(event);
            currentHSL.s = scaledX;
            currentHSL.l = (1 - scaledY) * (1 - currentHSL.s / 2);
            setCurrentHSL(currentHSL.clone());
            onColorPicked(currentHSL.toRGB());
          }}
          onTouchMove={(event) => {
            const {
              relativeX: scaledX,
              relativeY: scaledY,
            } = getRelativeClickPosition(event);
            currentHSL.s = scaledX;
            currentHSL.l = (1 - scaledY) * (1 - currentHSL.s / 2);
            setCurrentHSL(currentHSL.clone());
          }}
        >
          <div className="Lightness" />
        </div>

        <div
          className="Hue"
          onTouchEnd={(event) => {
            const { relativeX: scaledX } = getRelativeClickPosition(event);
            currentHSL.h = scaledX * 360;
            setCurrentHSL(currentHSL.clone());
          }}
          onTouchMove={(event) => {
            const { relativeX: scaledX } = getRelativeClickPosition(event);
            currentHSL.h = scaledX * 360;
            setCurrentHSL(currentHSL.clone());
          }}
        ></div>
      </div>
    </div>
  );
};
