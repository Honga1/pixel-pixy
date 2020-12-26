import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { PinnedColors } from "./components/PinnedColors";
import { useEffect } from "react";
import { RGBColor } from "./drivers/Color";
import { AvailablePalettes } from "./PaletteDictionary";

/** TODO: Make a component that displays a list of colors.
 * Use logic here to decide which colors to show.
 * Probably remove ColorPickerHistory and PinnedColors and combine into here */
export const BodyColorPicker = ({
  setColorAndTurnOffPicker,
  color,
  palette,
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
    if (newColorHistory.length > 8) {
      newColorHistory = newColorHistory.slice(0, 8);
    }

    setColorHistory(newColorHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  if (pickerMode === "history") {
    return (
      <ColorPickerHistory
        setColorHistory={setColorHistory}
        colorHistory={colorHistory}
        onColorPicked={setColorAndTurnOffPicker}
        colorSelected={color}
      />
    );
  } else {
    return (
      <PinnedColors
        onColorPicked={setColorAndTurnOffPicker}
        pinnedColors={pinnedColors}
      />
    );
  }
};
