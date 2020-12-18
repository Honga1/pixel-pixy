import { TouchEvent, useRef } from "react";
import { getRelativeClickPosition } from "../drivers/getRelativeClickPosition";
import "../styles/CanvasContainer.css";

export const DebugCanvasContainer = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  const onInnerTouchEvent = (event: TouchEvent<HTMLCanvasElement>) => {
    const { relativeX, relativeY } = getRelativeClickPosition(event);
    const maybeContext = ref.current?.getContext("2d");
    if (!maybeContext) return;
    maybeContext.fillStyle = "red";
    maybeContext.fillRect(
      relativeX * window.innerWidth,
      relativeY * window.innerHeight,
      10,
      10
    );
  };

  return (
    <canvas
      style={{
        background: "none",
        position: "absolute",
        pointerEvents: "none",
      }}
      onTouchEnd={onInnerTouchEvent}
      onTouchMove={onInnerTouchEvent}
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};
