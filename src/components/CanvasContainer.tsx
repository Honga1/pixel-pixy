import { TouchEvent, useEffect, useMemo, useRef } from "react";
import "../styles/CanvasContainer.css";
import { Background } from "../Tools";

export const CanvasContainer = ({
  onCanvasCreated,
  onTouchEvent,
  pixelDimensions,
  background,
}: {
  pixelDimensions: number;
  onCanvasCreated: (canvas: HTMLCanvasElement) => void;
  onTouchEvent: (
    canvas: HTMLCanvasElement,
    touchEvent: TouchEvent<HTMLCanvasElement>
  ) => void;
  background: Background;
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

  const backgroundStyle = useMemo(
    () => getBackgroundStyle(background, pixelDimensions),
    [background, pixelDimensions]
  );
  const backgroundClass = useMemo(() => getBackgroundClass(background), [
    background,
  ]);

  return (
    <canvas
      className={`CanvasContainer ${backgroundClass}`}
      style={backgroundStyle}
      ref={canvasRef}
      width={pixelDimensions}
      height={pixelDimensions}
      onTouchEnd={onInnerTouchEvent}
      onTouchMove={onInnerTouchEvent}
    />
  );
};

const getBackgroundClass = (background: Background) => {
  switch (background.type) {
    case "checkerboard":
      return "CheckerboardBackground";
    case "color":
      return "ColorBackground";
    case "image":
      return "ImageBackground";
  }
};

const getBackgroundStyle = (
  background: Background,
  pixelDimensions: number
) => {
  switch (background.type) {
    case "checkerboard":
      return {
        backgroundSize: `${100 / pixelDimensions / 2}%`,
      };
    case "color":
      return {
        backgroundColor: background.color.toHex(),
      };
    case "image":
      return {
        backgroundColor: background.color.toHex(),
        backgroundImage: `url(${background.image?.src})`,
        backgroundSize: background.size,
      };
  }
};
