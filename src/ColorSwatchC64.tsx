// import { useState, useEffect } from "react";
// import { RGBColor } from "./drivers/RGBColor";
import { RGBColor } from "./drivers/RGBColor";
import "./styles/ColorSwatchC64.css";

const palette = [
  "#000000",
  "#FFFFFF",
  "#880000",
  "#AAFFEE",
  "#DD8855",
  "#664400",
  "#FF7777",
  "#333333",
  "#CC44CC",
  "#00CC55",
  "#0000AA",
  "#EEEE77",
  "#777777",
  "#AAFF66",
  "#0088FF",
  "#BBBBBB",
].map(RGBColor.fromHexString);

export const ColorSwatchC64 = ({
  onColorPicked,
}: {
  onColorPicked: (color: RGBColor) => void;
}) => {
  return (
    <div className="C64Swatch">
      {palette.map((color, index) => (
        <div
          className="colorRow"
          onTouchEnd={() => onColorPicked(color)}
          key={index}
          style={{ backgroundColor: color.toHex() }}
        ></div>
      ))}
    </div>
  );
};
