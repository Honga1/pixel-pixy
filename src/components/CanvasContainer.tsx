import { useEffect, useRef, TouchEvent } from "react";
import { getRelativeClickPosition } from "../drivers/getRelativeClickPosition";
import { RGBColor } from "../drivers/RGBColor";
import "../styles/CanvasContainer.css";

const debug = false;
export const CanvasContainer = ({
  color,
  onCanvasCreated,
  loadedImage,
  changeToClear,
  pixelDimensions,
}: {
  pixelDimensions: number;
  color: RGBColor;
  onCanvasCreated: (canvas: HTMLCanvasElement) => void;
  loadedImage: HTMLImageElement | undefined;
  changeToClear: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debugCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      onCanvasCreated(canvas);
    }
  }, [onCanvasCreated]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context || !canvas || !loadedImage) return;

    context.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
  }, [loadedImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!(context && canvas)) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  }, [changeToClear]);

  const onTouchEvent = (event: TouchEvent<HTMLCanvasElement>) => {
    const { relativeX, relativeY } = getRelativeClickPosition(event);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;

    const scaledX = relativeX * pixelDimensions;
    const scaledY = relativeY * pixelDimensions;

    const quantX = Math.floor(scaledX);
    const quantY = Math.floor(scaledY);

    context.fillStyle = color.toHex();
    context.fillRect(quantX, quantY, 1, 1);

    if (debug) {
      const maybeContext = debugCanvasRef.current?.getContext("2d");
      if (!maybeContext) return;
      maybeContext.fillStyle = "red";
      maybeContext.fillRect(
        relativeX * window.innerWidth,
        relativeY * window.innerHeight,
        10,
        10
      );
    }
  };

  return (
    <div className="CanvasContainer">
      <div>
        <canvas
          style={{
            backgroundSize: `${100 / pixelDimensions / 2}%`,
          }}
          ref={canvasRef}
          width={pixelDimensions}
          height={pixelDimensions}
          onTouchEnd={onTouchEvent}
          onTouchMove={onTouchEvent}
        ></canvas>
        {debug && (
          <canvas
            style={{
              background: "none",
              position: "absolute",
              pointerEvents: "none",
            }}
            ref={debugCanvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
          ></canvas>
        )}
      </div>
    </div>
  );
};
