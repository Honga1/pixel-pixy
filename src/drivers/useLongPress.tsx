import { useRef } from "react";

export const useLongPress = (
  onLongPressComplete: (event: React.TouchEvent<HTMLDivElement>) => void,
  duration: number,
  onLongPressCancel?: (
    event: React.TouchEvent<HTMLDivElement> | undefined
  ) => void
) => {
  const timeout = useRef<NodeJS.Timeout>();
  const wasLongPress = useRef(false);

  const cancelTimeout = () => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = undefined;
  };

  const onPressDown = (event: React.TouchEvent<HTMLDivElement>) => {
    timeout.current = setTimeout(() => {
      wasLongPress.current = true;
      onLongPressComplete(event);
      cancelTimeout();
    }, duration);
  };

  const onPressUp = (event: React.TouchEvent<HTMLDivElement>) => {
    if (timeout.current === undefined) return;
    cancelTimeout();
    onLongPressCancel?.(event);
  };

  return { onPressDown, onPressUp, wasLongPress };
};
