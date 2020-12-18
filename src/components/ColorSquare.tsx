import { Button } from "grommet";
import { RGBColor } from "../drivers/RGBColor";

export const ColorSquare = ({
  color,
  onTouchEnd,
}: {
  color: RGBColor;
  onTouchEnd?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return <Button primary color={color.toHex()} onClick={onTouchEnd} />;
};
