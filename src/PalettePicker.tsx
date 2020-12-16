import { ReactElement } from "react";
import { AvailablePalettes, paletteNameDictionary } from "./PaletteDictionary";

export const PalettePicker = ({
  palette,
  onPaletteChange,
}: {
  palette: AvailablePalettes;
  onPaletteChange: (palette: AvailablePalettes) => void;
}): ReactElement => {
  const possiblePalettes = paletteNameDictionary;
  return (
    <div>
      <label>
        Palette
        <select
          value={palette}
          onChange={(event) =>
            onPaletteChange(event.target.value as AvailablePalettes)
          }
        >
          {(Object.entries(possiblePalettes) as [
            AvailablePalettes,
            string
          ][]).map(([key, paletteName]) => (
            <option key={key} value={key}>
              {paletteName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
