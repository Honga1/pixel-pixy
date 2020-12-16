export const ToggleButton = ({
  onToggle,
  text,
}: {
  onToggle: () => void;
  text: string;
}) => {
  return <button onTouchEnd={onToggle}>{text}</button>;
};
