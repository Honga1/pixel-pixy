import { Box, Button } from "grommet";
import { RGBColor } from "../drivers/color/src/RGBColor";

export const CurrentColorBox = ({
  currentColor,
}: {
  currentColor: RGBColor;
}) => {
  return (
    <Box height="small" gap="small" pad={{ top: "small", bottom: "small" }}>
      Current
      <Box height="xsmall" width="xsmall" pad={{ bottom: "xsmall" }}>
        <Button
          primary
          fill="vertical"
          size="large"
          color={currentColor.toHex()}
          style={{
            borderRadius: "0",
            border: "none",
          }}
        ></Button>
      </Box>
    </Box>
  );
};
