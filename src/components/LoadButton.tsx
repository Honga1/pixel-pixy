import { Button } from "grommet";
import { useRef } from "react";

export const LoadButton = ({
  setLoadedImage,
  onLoadStart,
}: {
  setLoadedImage: (image: HTMLImageElement) => void;
  onLoadStart?: (image: Promise<HTMLImageElement>) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        size="small"
        label="Choose Image"
        onClick={() => {
          const input = ref.current;
          if (!input) return;
          input.click();
        }}
      />

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
          onLoadStart?.(imagePromise);
          const image = await imagePromise;
          setLoadedImage(image);
        }}
        type="file"
        accept="image/*"
      />
    </>
  );
};
