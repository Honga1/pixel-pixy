export function getRelativeClickPosition(
  touch: { clientX: number; clientY: number },
  target: HTMLElement
): { relativeX: number; relativeY: number } {
  const screenX = touch.clientX;
  const screenY = touch.clientY;
  const rect = (target as HTMLElement).getBoundingClientRect();

  const clip = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(value, min));

  const clippedX = clip(screenX - rect.left, 0, rect.width - 1);
  const clippedY = clip(screenY - rect.top, 0, rect.height - 1);

  const relativeX = clippedX / rect.width;
  const relativeY = clippedY / rect.height;
  return { relativeX: relativeX, relativeY: relativeY };
}
