import { Box, Button } from "grommet";
import { Pin } from "grommet-icons";
import { useState } from "react";
import { RGBColor } from "../drivers/color/src/RGBColor";
import { useLongPress } from "../hooks/useLongPress";
import { ColorPickerSwatch } from "../components/ColorPickerSwatch";
import { Modal } from "./Modal";
import {
  AvailablePalettes,
  paletteColorDictionary,
} from "../PaletteDictionary";
import { PalettePicker } from "../components/PalettePicker";
export const PaletteModal = ({
  onCancel,
  setColor,
  palette = "cga",
  pinnedColors = [],
  setPinnedColors,
  setPalette,
}: {
  onCancel: () => void;
  setColor: (color: RGBColor) => void;
  palette?: AvailablePalettes | "Picker";
  pinnedColors?: RGBColor[];
  setPalette?: (palette: AvailablePalettes | "Picker") => void;
  setPinnedColors?: (colors: RGBColor[]) => void;
}) => {
  const [innerPalette, setInnerPalette] = useState<
    AvailablePalettes | "Picker"
  >(palette);
  const paletteColors = paletteColorDictionary[innerPalette];
  const selectedPalette = paletteColors.map(RGBColor.fromHexString);

  const onPaletteChange = (palette: AvailablePalettes | "Picker") => {
    setInnerPalette(palette);
    setPalette?.(palette);
  };

  const { onPressDown, onPressUp } = useLongPress(
    (event) => {
      if (!setPinnedColors) return;
      const index = getButtonIndex(event);
      if (index === undefined) return;

      const color = selectedPalette[index];

      const isPinned = !!pinnedColors.find((pinned) =>
        RGBColor.Equals(pinned, color)
      );

      if (isPinned) {
        const currentPinnedColors = [...pinnedColors].filter(
          (pinned) => !RGBColor.Equals(color, pinned)
        );
        setPinnedColors(currentPinnedColors);
      } else {
        const currentPinnedColors = [...pinnedColors];
        currentPinnedColors.push(color);
        setPinnedColors(currentPinnedColors);
      }
    },
    500,
    (event) => {
      if (event === undefined) return;
      event.preventDefault();
      const maybeIndex = getButtonIndex(event);
      if (maybeIndex === undefined) return;

      const color = selectedPalette[maybeIndex];
      setColor(color);
      onCancel();
    }
  );
  if (palette === "Picker") {
    return (
      <Modal onClose={onCancel} heading={"Palette"}>
        <ColorPickerSwatch
          selectedColor={new RGBColor(255, 0, 0)}
          onColorPicked={setColor}
        />
        <Box pad={{ top: "small", bottom: "small" }} gap="small">
          <PalettePicker palette={palette} onPaletteChange={onPaletteChange} />
        </Box>
      </Modal>
    );
  }
  return (
    <Modal onClose={onCancel} heading={"Palette"}>
      <Box fill pad={{ top: "small", bottom: "small" }} gap="small">
        <Box
          direction="row"
          wrap
          justify="between"
          alignSelf="center"
          onTouchStart={onPressDown}
          onTouchEnd={onPressUp}
        >
          {Object.values(selectedPalette).map((color, index) => {
            const isPinned = !!pinnedColors.find((pinned) =>
              RGBColor.Equals(pinned, color)
            );
            return (
              <Box
                key={index}
                height="xsmall"
                width="xsmall"
                pad={{ bottom: "xsmall" }}
              >
                <Button
                  primary
                  fill="vertical"
                  size="large"
                  key={index}
                  data-index={index}
                  color={color.toHex()}
                  icon={isPinned ? <Pin /> : undefined}
                  style={{
                    borderRadius: "0",
                    border: "none",
                  }}
                ></Button>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box pad={{ top: "small", bottom: "small" }} gap="small">
        <PalettePicker palette={palette} onPaletteChange={onPaletteChange} />
      </Box>
    </Modal>
  );
};
function getButtonIndex(event: React.TouchEvent): number | undefined {
  const maybeIndexString = (event.target as HTMLButtonElement).dataset.index;
  if (!maybeIndexString) return undefined;

  return parseInt(maybeIndexString, 10);
}
