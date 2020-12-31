import { CheckBox } from "grommet";
import { Modal } from "./Modal";

export const SettingsModal = ({
  onClickOutside,
  resetMode,
  isDarkMode,
  resetFeedbackMode,
  isFeedback,
}: {
  isDarkMode: boolean;
  onClickOutside: () => void;
  resetMode: (value: boolean) => void;
  resetFeedbackMode: (value: boolean) => void;
  isFeedback: boolean;
}) => {
  return (
    <Modal onClose={onClickOutside} heading={"Settings"}>
      <CheckBox
        toggle
        onChange={(event) => resetMode(event.target.checked)}
        label={"Dark Mode"}
        checked={isDarkMode}
      />
      <CheckBox
        toggle
        onChange={(event) => resetFeedbackMode(event.target.checked)}
        label={"Show feedback"}
        checked={isFeedback}
      />
    </Modal>
  );
};
