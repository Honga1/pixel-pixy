/* eslint-disable jsx-a11y/anchor-has-content */
import { Button } from "grommet";
import { Share } from "grommet-icons";
import { useRef } from "react";

export const SaveButton = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const onShareClick = async () => {
    const fullScaleCanvas = document.createElement("canvas");
    fullScaleCanvas.width = window.innerWidth;
    fullScaleCanvas.height = window.innerWidth;
    const context = fullScaleCanvas.getContext("2d")!;
    context.imageSmoothingEnabled = false;
    context.drawImage(
      canvas,
      0,
      0,
      fullScaleCanvas.width,
      fullScaleCanvas.height
    );

    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((maybeBlob) => {
          if (maybeBlob) {
            resolve(maybeBlob);
          } else {
            reject(new Error("Unable to convert canvas to blob"));
          }
        }, "image/png");
      });

      navigator
        .share({
          title: "My Pixel Art Drawing",
          text: "Made with Pixel Pixy",
          files: Object.freeze([new File([blob], "my-pixel-art.png")]),
        })
        .catch((error: Error) => {
          if (error.name === "AbortError") {
            console.debug("User cancelled share");
            return;
          }
          throw error;
        });
    } catch (error) {
      console.debug("Could not use share api, using image download");
      console.debug(error);
      const image = fullScaleCanvas.toDataURL("image/png");
      if (anchorRef.current) {
        anchorRef.current.href = image;
        anchorRef.current.click();
      }
    }
  };
  return (
    <>
      <Button icon={<Share />} onClick={onShareClick} />
      <a
        ref={anchorRef}
        href="/"
        style={{ display: "none" }}
        download="my-pixel-art.png"
      />
    </>
  );
};
