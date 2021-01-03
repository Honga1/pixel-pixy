import { Box, Button } from "grommet";
import { Blank } from "grommet-icons";
import { RGBColor } from "../drivers/Color";

export const PinnedColors = ({
  pinnedColors = [],
  onColorPicked,
}: {
  pinnedColors: RGBColor[];
  onColorPicked: (color: RGBColor) => void;
}) => {
  return (
    <Box
      className="ColorPickerHistory"
      direction="row"
      justify="start"
      wrap
      gap="xxsmall"
    >
      {pinnedColors.slice(0, 8).map((color, index) => (
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
