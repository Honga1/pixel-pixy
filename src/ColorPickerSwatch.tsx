import { useState, TouchEvent, useEffect } from "react";
import { RGBColor } from "./drivers/RGBColor";
import "./styles/ColorPickerSwatch.css";
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
    // Extract HSl from string
    const hsl = selectedColor.toHSL();
    if (hsl) {
      setCurrentHSL(hsl);
    }
  }, [selectedColor]);

  return (
    <div
      style={{ backgroundColor: `hsl(${currentHSL.h}, 100%, 50%)` }}
      className="ColorPickerSwatch"
    >
      <div
        className="Saturation"
        onTouchEnd={(event) => {
          const { scaledX, scaledY } = getRelativeClickPosition(event);
          currentHSL.s = scaledX;
          currentHSL.l = (1 - scaledY) * (1 - currentHSL.s / 2);
          setCurrentHSL(currentHSL.clone());
          onColorPicked(currentHSL.toRGB());
        }}
        onTouchMove={(event) => {
          const { scaledX, scaledY } = getRelativeClickPosition(event);
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
          const { scaledX } = getRelativeClickPosition(event);
          currentHSL.h = scaledX * 360;
          setCurrentHSL(currentHSL.clone());
        }}
        onTouchMove={(event) => {
          const { scaledX } = getRelativeClickPosition(event);
          currentHSL.h = scaledX * 360;
          setCurrentHSL(currentHSL.clone());
        }}
      ></div>
    </div>
  );
};
function getRelativeClickPosition(
  event: TouchEvent<HTMLDivElement>
): { scaledX: number; scaledY: number } {
  const screenX = event.changedTouches[0].clientX;
  const screenY = event.changedTouches[0].clientY;
  const rect = (event.target as HTMLDivElement).getBoundingClientRect();

  const clip = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(value, min));

  const clippedX = clip(screenX, rect.left, rect.right);
  const clippedY = clip(screenY, rect.top, rect.bottom);

  const scaledX = clippedX / rect.width;
  const scaledY = clippedY / rect.height;
  return { scaledX, scaledY };
}
