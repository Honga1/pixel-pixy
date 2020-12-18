import { Box, Grid, Layer } from "grommet";
import React from "react";
import { RGBColor } from "./drivers/RGBColor";
import { PaletteColourSwatch } from "./PaletteColorSwatch";
import { AvailablePalettes } from "./PaletteDictionary";
import { PalettePicker } from "./PalettePicker";

export const PaletteModal = ({
  onClickOutside,
  setColor,
  palette,
  setPalette,
}: {
  onClickOutside: () => void;
  setColor: (color: RGBColor) => void;
  palette: AvailablePalettes;
  setPalette: (palette: AvailablePalettes) => void;
}) => {
  return (
    <Layer
      modal
      position="top"
      responsive={false}
      full="horizontal"
      onClickOutside={onClickOutside}
    >
      <Box pad="small" fill>
        <Box fill pad={{ top: "small", bottom: "small" }} gap="small">
          <PaletteColourSwatch
            onColorPicked={setColor}
            palette={palette}
          ></PaletteColourSwatch>
        </Box>
        <Box pad={{ top: "small", bottom: "small" }} gap="small">
          <PalettePicker
            palette={palette}
            onPaletteChange={setPalette}
          ></PalettePicker>
        </Box>

        <Grid
          columns={{ count: 2, size: ["auto", "auto"] }}
          gap="small"
          pad={{ top: "medium", bottom: "small" }}
        ></Grid>
      </Box>
    </Layer>
  );
};
