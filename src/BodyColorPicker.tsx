import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { PinnedColors } from "./components/PinnedColors";
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
