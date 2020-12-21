import { Box, Button, Text } from "grommet";
import { useEffect, useState } from "react";
import { RGBColor } from "../drivers/RGBColor";

export const ColorPickerHistory = ({
  colorSelected,
  onColorPicked,
}: {
  colorSelected: RGBColor;
  onColorPicked: (color: RGBColor) => void;
}) => {
  const [colorHistory, setColorHistory] = useState<RGBColor[]>([]);

  useEffect(() => {
    if (
      colorHistory.filter((color) => {
        return RGBColor.Equals(color, colorSelected);
      }).length !== 0
    ) {
      return;
    }

    let newColorHistory = [...colorHistory];
    newColorHistory.unshift(colorSelected);
    if (newColorHistory.length > 8) {
      newColorHistory = newColorHistory.slice(0, 8);
    }

    setColorHistory(newColorHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSelected]);

  return (
    <Box gap="small">
      <Text alignSelf="start">Recent</Text>
      <Box
        className="ColorPickerHistory"
        direction="row"
        justify="start"
        wrap
        gap="xxsmall"
      >
        {colorHistory.map((color, index) => (
          <Box height="xxsmall" width="xxsmall" pad={{ bottom: "xsmall" }}>
            <Button
              fill="vertical"
              size="small"
              onClick={() => onColorPicked(color)}
              key={index}
              style={{
                backgroundColor: color.toHex(),
                border: "none",
              }}
            ></Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
