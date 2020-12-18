import { ColorSquare } from "./ColorSquare";
import { RGBColor } from "../drivers/RGBColor";
import "../styles/CurrentColor.css";
import { Box, Text } from "grommet";

export const CurrentColor = ({ color }: { color: RGBColor }) => {
  return (
    <Box className="CurrentColor" direction="row" gap="small">
      <Text>
        Current
        <br />
        Color
      </Text>
      <ColorSquare color={color}></ColorSquare>
    </Box>
  );
};