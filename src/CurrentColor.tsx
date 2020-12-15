import { ColorSquare } from "./ColorSquare";
import { RGBColor } from "./drivers/RGBColor";
import "./styles/CurrentColor.css";

export const CurrentColor = ({ color }: { color: RGBColor }) => {
  return (
    <div className="CurrentColor">
      <div>CurrentColor</div>
      <ColorSquare color={color}></ColorSquare>
    </div>
  );
};
