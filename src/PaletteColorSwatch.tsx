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
    <div className="PaletteWrapper">
      {Object.values(selectedPalette).map((color, index) => (
        <div
          className="colorBlock"
          onTouchEnd={() => onColorPicked(color)}
          key={index}
          style={{ backgroundColor: color.toHex() }}
        ></div>
      ))}
    </div>
  );
};
