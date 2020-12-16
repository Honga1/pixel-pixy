import { useEffect, useRef, TouchEvent, useMemo } from "react";
import { getRelativeClickPosition } from "../drivers/getRelativeClickPosition";
import { PaintCanvas } from "../drivers/PaintCanvas";
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

  const paint = useMemo(() => new PaintCanvas(pixelDimensions), [
    pixelDimensions,
  ]);

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
    paint.touchEvent(event, color);
    const { relativeX, relativeY } = getRelativeClickPosition(event);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;
    paint.setCanvas(canvas);
    paint.drawToCanvas();

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
