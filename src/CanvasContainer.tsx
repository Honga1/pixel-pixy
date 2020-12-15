import { useEffect, useRef, TouchEvent } from "react";
import { RGBColor } from "./drivers/RGBColor";
import "./styles/CanvasContainer.css";

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
    const maybeTouch = event.changedTouches[0];
    if (!maybeTouch) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;

    const touch = maybeTouch;

    const scaledX = (touch.clientX / canvas.clientWidth) * pixelDimensions;
    const scaledY = (touch.clientY / canvas.clientHeight) * pixelDimensions;

    const quantX = Math.floor(scaledX);
    const quantY = Math.floor(scaledY);

    context.fillStyle = color.toHex();
    context.fillRect(quantX, quantY, 1, 1);
  };

  return (
    <div className="CanvasContainer">
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
    </div>
  );
};
