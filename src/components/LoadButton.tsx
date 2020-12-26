import { Box, Button, Text } from "grommet";
import { useRef, useState } from "react";

export const LoadButton = ({
  setLoadedImage,
}: {
  setLoadedImage: (image: HTMLImageElement) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState("No File Chosen");
  return (
    <Box direction="row" gap="small">
      <Button
        label="Choose File"
        onClick={() => {
          const input = ref.current;
          if (!input) return;
          input.click();
        }}
      />
      <Text
        alignSelf="center"
        onClick={() => {
          const input = ref.current;
          if (!input) return;
          input.click();
        }}
      >
        {imageName}
      </Text>
      <input
        ref={ref}
        style={{ display: "none" }}
        onChange={async (event) => {
          const imagePromise = new Promise<HTMLImageElement>(
            (resolve, reject) => {
              if (!event.target.files || !event.target.files[0]) return;
              const imageUrl = URL.createObjectURL(event.target.files![0]);
              const image = new Image();
              image.src = imageUrl;
              image.onload = () => resolve(image);
            }
          );
          const image = await imagePromise;
          setImageName(event.target.files?.[0]?.name || "No File Chosen");
          setLoadedImage(image);
        }}
        type="file"
        accept="image/*"
      />
    </Box>
  );
};
