import { Button } from "grommet";
import { useEffect, useState } from "react";
import { RGBColor } from "./drivers/Color";
import { PaletteModal } from "./PaletteModal";
import { BackgroundColorData } from "./Tools";

export const BackgroundColorForm = ({
  color,
  onFormComplete,
}: {
  color?: RGBColor;
  onFormComplete: (data: BackgroundColorData) => void;
}) => {
  const [innerColor, setColor] = useState<RGBColor | undefined>(color);
  const [isPaletteModalShown, setPaletteMenuShown] = useState(false);

  useEffect(() => {
    if (!innerColor || (color && RGBColor.Equals(innerColor, color))) return;
    onFormComplete({ type: "color", color: innerColor });
  }, [color, innerColor, onFormComplete]);

  return (
    <>
      <Button
        primary
        color={innerColor?.toHex()}
        label={"Select color"}
        onClick={() => setPaletteMenuShown(true)}
      />
      {isPaletteModalShown && (
        <PaletteModal
          onCancel={() => setPaletteMenuShown(false)}
          setColor={setColor}
        />
      )}
    </>
  );
};
