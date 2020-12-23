import { Layer, Box, CheckBox } from "grommet";

export const SettingsModal = ({
  onClickOutside,
  resetMode,
}: {
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
        />
      </Box>
    </Layer>
  );
};
