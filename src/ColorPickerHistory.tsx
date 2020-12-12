import { useEffect, useState } from "react";
import { ColorSquare } from "./ColorSquare";
import "./styles/ColorPickerHistory.css";

export const ColorPickerHistory = ({
  colorSelected,
  onColorPicked,
}: {
  colorSelected: string;
  onColorPicked: (color: string) => void;
}) => {
  const [colorHistory, setColorHistory] = useState<string[]>([]);

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
