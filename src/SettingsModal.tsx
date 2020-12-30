import { CheckBox } from "grommet";
import { Modal } from "./Modal";

export const SettingsModal = ({
  onClickOutside,
  resetMode,
  isDarkMode,
}: {
  isDarkMode: boolean;
  onClickOutside: () => void;
  resetMode: (value: boolean) => void;
}) => {
  return (
    <Modal onClose={onClickOutside} heading={"Settings"}>
      <CheckBox
        toggle
        onChange={(event) => resetMode(event.target.checked)}
        label={"Dark Mode"}
        checked={isDarkMode}
      />
    </Modal>
  );
};
