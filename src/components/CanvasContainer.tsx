import { TouchEvent, useEffect, useRef } from "react";
import "../styles/CanvasContainer.css";

export const CanvasContainer = ({
  onCanvasCreated,
  onTouchEvent,
  pixelDimensions,
}: {
  pixelDimensions: number;
  onCanvasCreated: (canvas: HTMLCanvasElement) => void;
  onTouchEvent: (
    canvas: HTMLCanvasElement,
    touchEvent: TouchEvent<HTMLCanvasElement>
  ) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      onCanvasCreated(canvas);
    }
  }, [onCanvasCreated]);

  const onInnerTouchEvent = (event: TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onTouchEvent(canvas, event);
  };

  return (
    <canvas
      className="CanvasContainer"
      style={{
        backgroundSize: `${100 / pixelDimensions / 2}%`,
      }}
      ref={canvasRef}
      width={pixelDimensions}
      height={pixelDimensions}
      onTouchEnd={onInnerTouchEvent}
      onTouchMove={onInnerTouchEvent}
    ></canvas>
  );
};
