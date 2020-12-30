/* eslint-disable jsx-a11y/anchor-has-content */
import { Button } from "grommet";
import { Share } from "grommet-icons";
import { useRef } from "react";

export const SaveButton = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const onShareClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const fullScaleCanvas = drawToHigherResolutionCanvas(canvas);

    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        fullScaleCanvas.toBlob((maybeBlob) => {
          if (maybeBlob) {
            resolve(maybeBlob);
          } else {
            reject(new Error("Unable to convert canvas to blob"));
          }
        }, "image/png");
      });

      if (document.location.protocol !== "https:") {
        throw new Error("Could not share. Page is not HTTPS.");
      }

      if (navigator.share === undefined) {
        throw new Error("Share unsupported in this browser");
      }

      const files = Object.freeze([
        new File([blob], "my-pixel-art.png", { type: blob.type }),
      ]);

      if (!(navigator.canShare && navigator.canShare({ files }))) {
        throw new Error("File sharing unsupported in this browser");
      }

      await navigator
        .share({
          title: "My pixel art",
          files,
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
      <Button icon={<Share />} onClick={onShareClick} focusIndicator={false} />
      <a
        ref={anchorRef}
        href="/"
        style={{ display: "none" }}
        download="my-pixel-art.png"
      />
    </>
  );
};

function drawToHigherResolutionCanvas(canvas: HTMLCanvasElement) {
  const fullScaleCanvas = document.createElement("canvas");
  fullScaleCanvas.width = 1024;
  fullScaleCanvas.height = 1024;
  const context = fullScaleCanvas.getContext("2d")!;
  context.imageSmoothingEnabled = false;
  context.drawImage(
    canvas,
    0,
    0,
    fullScaleCanvas.width,
    fullScaleCanvas.height
  );
  return fullScaleCanvas;
}
