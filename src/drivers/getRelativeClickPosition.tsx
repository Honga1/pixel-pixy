import { TouchEvent } from "react";

export function getRelativeClickPosition(
  event: TouchEvent<HTMLElement>
): { relativeX: number; relativeY: number } {
  const screenX = event.changedTouches[0].clientX;
  const screenY = event.changedTouches[0].clientY;
  const rect = (event.target as HTMLElement).getBoundingClientRect();

  const clip = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(value, min));

  const clippedX = clip(screenX - rect.left, 0, rect.width);
  const clippedY = clip(screenY - rect.top, 0, rect.height);

  const relativeX = clippedX / rect.width;
  const relativeY = clippedY / rect.height;
  return { relativeX: relativeX, relativeY: relativeY };
}
