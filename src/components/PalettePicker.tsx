import { Select } from "grommet";
import { ReactElement } from "react";
import { AvailablePalettes, paletteNameDictionary } from "../PaletteDictionary";

const options = ["Commodore 64", "DOS CGA/ EGA", "Teletext"];

const labelToValue = {
  "Commodore 64": "c64",
  "DOS CGA/ EGA": "cga",
  Teletext: "teletext",
} as const;

export const PalettePicker = ({
  palette,
  onPaletteChange,
}: {
  palette: AvailablePalettes;
  onPaletteChange: (palette: AvailablePalettes) => void;
}): ReactElement => {
  const possiblePalettes = paletteNameDictionary;
  return (
    <Select
      name="Select Palette"
      placeholder={possiblePalettes.c64}
      value={paletteNameDictionary[palette]}
      options={options}
      onChange={({ option }: { option: keyof typeof labelToValue }) =>
        onPaletteChange(labelToValue[option])
      }
    />
  );
};
