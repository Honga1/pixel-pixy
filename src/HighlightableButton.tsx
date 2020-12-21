import { Button, ButtonProps } from "grommet";
export const HighlightableButton = ({
  onClick,
  isHighlighted,
  ...props
}: {
  onClick: () => void;
  isHighlighted: boolean;
} & ButtonProps &
  Omit<JSX.IntrinsicElements["button"], "color">) => {
  return (
    <Button
      onClick={onClick}
      style={{
        borderRadius: "18px",
        boxShadow: isHighlighted ? "0 0 2px 2px green" : "none",
      }}
      {...props}
    />
  );
};
