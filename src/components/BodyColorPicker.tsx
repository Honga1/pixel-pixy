import { Box, Button } from "grommet";
import { Blank } from "grommet-icons";
import { useEffect, useRef } from "react";
import { RGBColor } from "../drivers/color/src/RGBColor";
import {
  AvailablePalettes,
  paletteColorDictionary,
} from "../PaletteDictionary";

export const BodyColorPicker = ({
  setColorAndTurnOffPicker,
  color,
  pickerMode,
  pinnedColors,
  colorHistory,
  setColorHistory,
  palette,
}: {
  pickerMode: "history" | "pinned" | "palette";
  setColorHistory: (history: RGBColor[]) => void;
  setColorAndTurnOffPicker: (color: RGBColor) => void;
  color: RGBColor;
  palette: AvailablePalettes;
  pinnedColors: RGBColor[];
  colorHistory: RGBColor[];
}) => {
  useAddToColorHistory(colorHistory, color, setColorHistory);

  const boxRef = useRef<HTMLDivElement>(null);
  let colors: RGBColor[] = [];

  switch (pickerMode) {
    case "history":
      colors = colorHistory.slice(0, 16);
      break;
    case "pinned":
      colors = pinnedColors;
      break;
    case "palette":
      colors = paletteColorDictionary[palette].map((color) =>
        RGBColor.fromHexString(color)
      );
  }

  return (
    <Box ref={boxRef} direction="row" justify="stretch" wrap overflow="auto">
      {colors.map((color, index) => (
        <Box pad={{ right: "xxsmall", top: "xxsmall" }} key={index}>
          <Button
            primary
            icon={<Blank />}
            onClick={() => setColorAndTurnOffPicker(color)}
            color={color.toHex()}
            style={{ borderRadius: 0 }}
          />
        </Box>
      ))}
    </Box>
  );
};

function useAddToColorHistory(
  colorHistory: RGBColor[],
  color: RGBColor,
  setColorHistory: (history: RGBColor[]) => void
) {
  useEffect(() => {
    if (
      colorHistory.filter((currentColor) => {
        return RGBColor.Equals(currentColor, color);
      }).length !== 0
    ) {
      return;
    }

    let newColorHistory = [...colorHistory];
    newColorHistory.unshift(color);

    setColorHistory(newColorHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);
}
