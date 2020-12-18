import { Box, Text } from "grommet";
import { RGBColor } from "../drivers/RGBColor";
import "../styles/CurrentColor.css";
import { ColorSquare } from "./ColorSquare";

export const CurrentColor = ({ color }: { color: RGBColor }) => {
  return (
    <Box className="CurrentColor" direction="row" gap="small">
      <Text>
        Current
        <br />
        Color
      </Text>
      <ColorSquare color={color} />
    </Box>
  );
};
