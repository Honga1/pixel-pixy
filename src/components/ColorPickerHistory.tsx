import { useEffect, useState } from "react";
import { ColorSquare } from "./ColorSquare";
import { RGBColor } from "../drivers/RGBColor";
import "../styles/ColorPickerHistory.css";

export const ColorPickerHistory = ({
  colorSelected,
  onColorPicked,
}: {
  colorSelected: RGBColor;
  onColorPicked: (color: RGBColor) => void;
}) => {
  const [colorHistory, setColorHistory] = useState<RGBColor[]>([]);

  useEffect(() => {
    let newColorHistory = [...colorHistory];
    newColorHistory.unshift(colorSelected);
    if (newColorHistory.length > 8) {
      newColorHistory = newColorHistory.slice(0, 8);
    }

    setColorHistory(newColorHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSelected]);

  return (
    <div className="ColorPickerHistory">
      Color History
      <div className="RowZero">
        {colorHistory.map((color, index) => (
          <ColorSquare
            onTouchEnd={() => onColorPicked(color)}
            key={index}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};
