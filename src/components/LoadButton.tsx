import { Box, Button, Text } from "grommet";
import { useRef } from "react";

export const LoadButton = ({
  setLoadedImage,
}: {
  setLoadedImage: (image: HTMLImageElement) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
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
        No File Chosen
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
          event.target.value = "";
          setLoadedImage(image);
        }}
        type="file"
        accept="image/*"
      />
    </Box>
  );
};
