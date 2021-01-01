import { useEffect, useRef } from "react";
import "../styles/Grid.css";

export type GridMode = "dots" | "lines" | "off";
export const Grid = ({
  pixelDimensions,
  rootCanvas,
  mode,
}: {
  mode: "lines" | "dots" | "off";
  pixelDimensions: number;
  rootCanvas: HTMLCanvasElement;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mode) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "lightgrey";
    context.lineWidth = 1;
    const xIncrement = canvas.width / pixelDimensions;
    const yIncrement = canvas.height / pixelDimensions;

    if (mode === "lines") {
      drawLines(context, xIncrement, yIncrement, pixelDimensions);
    } else {
      drawDots(context, xIncrement, yIncrement, pixelDimensions);
    }

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  });

  return (
    <canvas
      style={{ display: mode === "off" ? "none" : "unset" }}
      ref={canvasRef}
      key={pixelDimensions}
      className="Grid"
      width={rootCanvas.clientWidth}
      height={rootCanvas.clientHeight}
    />
  );
};
function drawDots(
  context: CanvasRenderingContext2D,
  xIncrement: number,
  yIncrement: number,
  pixelDimensions: number
) {
  for (let xIndex = 0; xIndex <= pixelDimensions; xIndex++) {
    for (let yIndex = 0; yIndex <= pixelDimensions; yIndex++) {
      const xPosition = xIncrement * xIndex;
      const yPosition = yIncrement * yIndex;
      context.fillStyle = "lightgrey";
      context.beginPath();
      context.arc(xPosition, yPosition, 2, 0, Math.PI * 2, false);
      context.fill();
    }
  }
}

function drawLines(
  context: CanvasRenderingContext2D,
  xIncrement: number,
  yIncrement: number,
  pixelDimensions: number
) {
  for (let xIndex = 0; xIndex < pixelDimensions; xIndex++) {
    context.moveTo(Math.round(xIndex * xIncrement), 0);
    context.lineTo(Math.round(xIndex * xIncrement), context.canvas.height);
    context.stroke();
  }

  // Horizontal lines
  for (let yIndex = 0; yIndex < pixelDimensions; yIndex++) {
    context.moveTo(0, Math.round(yIndex * yIncrement));
    context.lineTo(context.canvas.width, Math.round(yIndex * yIncrement));
    context.stroke();
  }
}
