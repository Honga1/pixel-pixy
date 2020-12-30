import { Box, Button } from "grommet";
import { RGBColor } from "../drivers/Color";
import { Blank } from "grommet-icons";

export const ColorPickerHistory = ({
  colorSelected,
  onColorPicked,
  colorHistory,
  setColorHistory,
}: {
  setColorHistory: (history: RGBColor[]) => void;
  colorHistory: RGBColor[];
  colorSelected: RGBColor;
  onColorPicked: (color: RGBColor) => void;
}) => {
  return (
    <Box
      className="ColorPickerHistory"
      direction="row"
      justify="start"
      wrap
      gap={"xxsmall"}
    >
      {colorHistory.map((color, index) => (
        <Button
          primary
          icon={<Blank />}
          onClick={() => onColorPicked(color)}
          key={index}
          color={color.toHex()}
          style={{ borderRadius: 0 }}
        ></Button>
      ))}
    </Box>
  );
};
