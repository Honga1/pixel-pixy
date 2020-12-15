// import { useState, useEffect } from "react";
import "./styles/ColorSwatchC64.css";

export const ColorSwatchC64 = ({
  selectedColor,
//   onColorPicked,
}: {
  selectedColor: string;
//   onColorPicked: (color: string) => void;
}) => {
  const palette: string[] = [
    "#000000",
    "#FFFFFF",
    "#880000",
    "#AAFFEE",
    "#CC44CC",
    "#00CC55",
    "#0000AA",
    "#EEEE77",
    "#DD8855",
    "#664400",
    "#FF7777",
    "#333333",
    "#777777",
    "#AAFF66",
    "#0088FF",
    "#BBBBBB",
  ];

  return (
    <div className="C64Swatch">
      {palette.map((color, index) => (
        <div
          className="colorRow"
          key={index}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};
