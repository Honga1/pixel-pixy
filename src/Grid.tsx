import { useEffect, useRef } from "react";
import "./styles/Grid.css";

export const Grid = ({
  pixelDimensions,
  rootCanvas,
}: {
  pixelDimensions: number;
  rootCanvas: HTMLCanvasElement;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "lightgrey";
    context.lineWidth = 1;
    const xIncrement = canvas.width / pixelDimensions;
    for (let xIndex = 0; xIndex < pixelDimensions; xIndex++) {
      context.moveTo(Math.round(xIndex * xIncrement), 0);
      context.lineTo(Math.round(xIndex * xIncrement), canvas.height);
      context.stroke();
    }

    // Horizontal lines
    const yIncrement = canvas.height / pixelDimensions;
    for (let yIndex = 0; yIndex < pixelDimensions; yIndex++) {
      context.moveTo(0, Math.round(yIndex * yIncrement));
      context.lineTo(canvas.width, Math.round(yIndex * yIncrement));
      context.stroke();
    }

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  });
  return (
    <canvas
      ref={canvasRef}
      key={pixelDimensions}
      className="Grid"
      width={rootCanvas.clientWidth}
      height={rootCanvas.clientHeight}
    ></canvas>
  );
};
