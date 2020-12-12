import { ColorSquare } from "./ColorSquare";
import "./styles/CurrentColor.css";

export const CurrentColor = ({ color }: { color: string }) => {
  return (
    <div className="CurrentColor">
      <div>CurrentColor</div>
      <ColorSquare color={color}></ColorSquare>
    </div>
  );
};
