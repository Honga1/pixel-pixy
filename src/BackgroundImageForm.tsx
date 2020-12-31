import { Select, Image } from "grommet";
import { useEffect, useState } from "react";
import { LoadButton } from "./components/LoadButton";
import {
  backgroundBackgroundImageSizes,
  BackgroundColorData,
  BackgroundImageData,
  Backgrounds,
} from "./Tools";
import { BackgroundColorForm } from "./BackgroundColorForm";

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
    <>
      <LoadButton setLoadedImage={setImage} />
      {image && (
        <Image
          style={{ backgroundColor: color?.toHex() }}
          src={image.src}
          fit={imageSize}
        />
      )}

      <Select
        value={imageSize}
        options={backgroundBackgroundImageSizes}
        onChange={({ option }: { option: BackgroundImageData["size"] }) =>
          setImageSize(option)
        }
      />

      <BackgroundColorForm
        color={color}
        onFormComplete={({ color }) => setColor(color)}
      />
    </>
  );
};
