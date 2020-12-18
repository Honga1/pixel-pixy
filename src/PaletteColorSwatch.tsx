import { Button } from "grommet";
import { Box } from "grommet/components/Box";
import React from "react";
import { RGBColor } from "./drivers/RGBColor";
import { AvailablePalettes, paletteColorDictionary } from "./PaletteDictionary";
import "./styles/PaletteColorSwatch.css";

export const PaletteColourSwatch = ({
  palette,
  onColorPicked,
}: {
  palette: AvailablePalettes;
  onColorPicked: (color: RGBColor) => void;
}) => {
  const paletteColors = paletteColorDictionary[palette];
  const selectedPalette = paletteColors.map(RGBColor.fromHexString);
  return (
    <Box direction="row" wrap justify="between" alignSelf="center">
      {Object.values(selectedPalette).map((color, index) => (
        <Box height="xsmall" width="xsmall" pad={{ bottom: "xsmall" }}>
          <Button
            fill="vertical"
            size="large"
            onClick={() => onColorPicked(color)}
            key={index}
            style={{
              backgroundColor: color.toHex(),
              borderRadius: "0",
              border: "none",
            }}
          ></Button>
        </Box>
      ))}
    </Box>
  );
};
