import "./styles/ColorSquare.css";
import { TouchEvent } from "react";

export const ColorSquare = ({
  color,
  onTouchEnd,
}: {
  color: string;
  onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      onTouchEnd={onTouchEnd}
      style={{ backgroundColor: color }}
      className="ColorSquare"
    ></div>
  );
};
