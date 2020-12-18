/* eslint-disable jsx-a11y/anchor-has-content */
import { Button } from "grommet";
import { Share } from "grommet-icons";
import { useRef } from "react";

export const SaveButton = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  return (
    <>
      <Button
        icon={<Share />}
        onClick={(event) => {
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

          const image = fullScaleCanvas.toDataURL("image/png");

          if (anchorRef.current) {
            anchorRef.current.href = image;
            anchorRef.current.click();
          }
        }}
      />
      <a
        ref={anchorRef}
        href="/"
        style={{ display: "none" }}
        download="my-pixel-art.png"
      />
    </>
  );
};
