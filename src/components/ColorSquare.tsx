import "../styles/ColorSquare.css";
import { TouchEvent } from "react";
import { RGBColor } from "../drivers/RGBColor";

export const ColorSquare = ({
  color,
  onTouchEnd,
}: {
  color: RGBColor;
  onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      onTouchEnd={onTouchEnd}
      style={{ backgroundColor: color.toHex() }}
      className="ColorSquare"
    ></div>
  );
};
