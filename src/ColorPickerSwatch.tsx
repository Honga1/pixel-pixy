import { useState, TouchEvent, useEffect } from "react";
import "./styles/ColorPickerSwatch.css";
export const ColorPickerSwatch = ({
  selectedColor,
  onColorPicked,
}: {
  selectedColor: string;
  onColorPicked: (color: string) => void;
}) => {
  const [currentHue, setCurrentHue] = useState(() => {
    const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g;
    const hsl = regexp.exec(selectedColor)?.slice(1);

    return hsl?.[0] || 0;
  });
  const [currentSaturation, setCurrentSaturation] = useState(100);
  const [currentLightness, setCurrentLightness] = useState(50);

  useEffect(() => {
    // Extract HSl from string
    const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g;
    const hsl = regexp.exec(selectedColor)?.slice(1);
    if (hsl) {
      setCurrentHue(parseFloat(hsl[0]));
    }
  }, [selectedColor]);

  return (
    <div
      style={{ backgroundColor: `hsl(${currentHue}, 100%, 50%)` }}
      className="ColorPickerSwatch"
    >
      <div
        className="Saturation"
        onTouchEnd={(event) => {
          const { scaledX, scaledY } = getRelativeClickPosition(event);
          setCurrentSaturation(scaledX * 100);
          setCurrentLightness((1 - scaledY) * 100);
          onColorPicked(
            `hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%)`
          );
        }}
        onTouchMove={(event) => {
          const { scaledX, scaledY } = getRelativeClickPosition(event);
          setCurrentSaturation(scaledX * 100);
          setCurrentLightness((1 - scaledY) * 100);
        }}
      >
        <div className="Lightness" />
      </div>

      <div
        className="Hue"
        onTouchEnd={(event) => {
          const { scaledX } = getRelativeClickPosition(event);
          setCurrentHue(scaledX * 360);
        }}
        onTouchMove={(event) => {
          const { scaledX } = getRelativeClickPosition(event);
          setCurrentHue(scaledX * 360);
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
