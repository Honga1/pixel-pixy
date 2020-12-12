export const ClearButton = ({
  onClearPressed,
}: {
  onClearPressed: () => void;
}) => {
  return <button onTouchEnd={onClearPressed}>Clear Canvas</button>;
};
