import "../styles/ColorSquare.css";
import { TouchEvent } from "react";
import { RGBColor } from "../drivers/RGBColor";
import { Box } from "grommet";

export const ColorSquare = ({
  color,
  onTouchEnd,
}: {
  color: RGBColor;
  onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
}) => {
  return (
    <Box
      round
      onTouchEnd={onTouchEnd}
      style={{ backgroundColor: color.toHex() }}
      className="ColorSquare"
    ></Box>
  );
};
