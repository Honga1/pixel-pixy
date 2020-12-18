import { useEffect, useState } from "react";
import { ColorSquare } from "./ColorSquare";
import { RGBColor } from "../drivers/RGBColor";
import "../styles/ColorPickerHistory.css";
import { Box, Text } from "grommet";

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
    <Box className="ColorPickerHistory" direction="row">
      <Text>
        Color
        <br />
        History
      </Text>
      {colorHistory.map((color, index) => (
        <ColorSquare
          onTouchEnd={() => onColorPicked(color)}
          key={index}
          color={color}
        />
      ))}
    </Box>
  );
};