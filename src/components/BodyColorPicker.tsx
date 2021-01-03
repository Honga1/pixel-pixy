import { Box, Button } from "grommet";
import { Blank } from "grommet-icons";
import { useEffect } from "react";
import { RGBColor } from "../drivers/color/src/RGBColor";
import { AvailablePalettes } from "../PaletteDictionary";

export const BodyColorPicker = ({
  setColorAndTurnOffPicker,
  color,
  pickerMode,
  pinnedColors,
  colorHistory,
  setColorHistory,
}: {
  pickerMode: "history" | "pinned";
  setColorHistory: (history: RGBColor[]) => void;
  setColorAndTurnOffPicker: (color: RGBColor) => void;
  color: RGBColor;
  palette: AvailablePalettes;
  pinnedColors: RGBColor[];
  colorHistory: RGBColor[];
}) => {
  useAddToColorHistory(colorHistory, color, setColorHistory);

  const colors =
    pickerMode === "history"
      ? colorHistory.slice(0, 8)
      : pinnedColors.slice(0, 8);

  return (
    <Box direction="row" justify="start" wrap gap={"xxsmall"}>
      {colors.map((color, index) => (
        <Button
          primary
          icon={<Blank />}
          onClick={() => setColorAndTurnOffPicker(color)}
          key={index}
          color={color.toHex()}
          style={{ borderRadius: 0 }}
        />
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
