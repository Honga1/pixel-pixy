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
}: {
  pickerMode: "history" | "pinned";
  setColorAndTurnOffPicker: (color: RGBColor) => void;
  color: RGBColor;
  palette: AvailablePalettes;
  pinnedColors: RGBColor[];
}) => {
  if (pickerMode === "history") {
    return (
      <ColorPickerHistory
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
