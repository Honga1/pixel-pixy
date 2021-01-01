import { Select, Image, Box, FormField } from "grommet";
import { useEffect, useState } from "react";
import { LoadButton } from "./components/LoadButton";
import {
  backgroundBackgroundImageSizes,
  BackgroundColorData,
  BackgroundImageData,
  Backgrounds,
} from "./Tools";
import { BackgroundColorForm } from "./BackgroundColorForm";
import defaultImageSrc from "./images/checker-board.png";

export const BackgroundImageForm = ({
  onFormComplete,
  background,
}: {
  background: Backgrounds;
  onFormComplete: (data: BackgroundImageData) => void;
}) => {
  const [imageSize, setImageSize] = useState<BackgroundImageData["size"]>(
    (background as Partial<BackgroundImageData>).size || "cover"
  );
  const [image, setImage] = useState<BackgroundImageData["image"] | undefined>(
    (background as Partial<BackgroundImageData>).image || undefined
  );
  const [color, setColor] = useState<BackgroundImageData["color"] | undefined>(
    (background as Partial<BackgroundColorData>).color
  );

  useEffect(() => {
    if (!image || !color) return;

    onFormComplete({ type: "image", image, size: imageSize, color });
  }, [color, image, imageSize, onFormComplete]);

  return (
    <Box gap="small">
      <FormField label="Image fill mode" name="select">
        <Select
          value={imageSize}
          options={backgroundBackgroundImageSizes}
          onChange={({ option }: { option: BackgroundImageData["size"] }) =>
            setImageSize(option)
          }
        />
      </FormField>
      <LoadButton setLoadedImage={setImage} image={image} />
      <Box width="small" height="small" alignSelf="center">
        <Image
          style={{ backgroundColor: color?.toHex() }}
          src={image?.src || defaultImageSrc}
          fit={imageSize}
        />
      </Box>

      <BackgroundColorForm
        color={color}
        onFormComplete={({ color }) => setColor(color)}
      />
    </Box>
  );
};
