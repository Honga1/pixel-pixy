import { Box, Button } from "grommet";
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
        <Box
          key={color.toHex()}
          height="xxsmall"
          width="xxsmall"
          pad={{ bottom: "xsmall" }}
        >
          <Button
            fill="vertical"
            size="small"
            onClick={() => onColorPicked(color)}
            key={index}
            style={{
              backgroundColor: color.toHex(),
              border: "none",
            }}
          ></Button>
        </Box>
      ))}
    </Box>
  );
};
