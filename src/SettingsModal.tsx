import { Layer, Box, CheckBox } from "grommet";

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
    <Layer
      modal
      position="bottom"
      responsive={false}
      full="horizontal"
      onClickOutside={onClickOutside}
    >
      <Box pad="small" fill>
        <CheckBox
          toggle
          onChange={(event) => resetMode(event.target.checked)}
          label={"Dark Mode"}
          checked={isDarkMode}
        />
      </Box>
    </Layer>
  );
};
