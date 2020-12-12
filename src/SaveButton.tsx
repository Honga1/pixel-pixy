export const SaveButton = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  return (
    <a
      onTouchEnd={(event) => {
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
        (event.target as EventTarget & HTMLAnchorElement).href = image;
      }}
      href="/"
      download="my-pixel-art.png"
    >
      Save
    </a>
  );
};
