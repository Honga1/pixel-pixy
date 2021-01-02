import { Box, Button, CheckBox, Grid, Text } from "grommet";
import { useState } from "react";
import { BackgroundImageSettings } from "./BackgroundImageSettings";
import { Modal } from "./Modal";
import { Background } from "./Tools";

type SettingsData = {
  backgroundData: Background;
  isDarkMode: boolean;
  isFeedbackOn: boolean;
};

export const SettingsModal = ({
  onCancel,
  onSave,
  setDarkMode,
  isDarkMode,
  isFeedbackOn,
  background,
}: {
  isDarkMode: boolean;
  background: Background;
  onCancel: () => void;
  onSave: (settingsData: SettingsData) => void;
  setDarkMode: (value: boolean) => void;
  isFeedbackOn: boolean;
}) => {
  const [
    isBackgroundImageSettingsShown,
    setBackgroundImageSettingsShown,
  ] = useState(false);

  const [backgroundData, setBackgroundData] = useState<Background>(background);
  const [innerIsFeedbackOn, setFeedbackOn] = useState(isFeedbackOn);

  return (
    <>
      <Modal onClose={onCancel} heading={"Settings"}>
        <Box gap="small">
          <Box
            direction="row"
            gap="small"
            fill="horizontal"
            justify="between"
            pad={{ left: "8px" }}
          >
            <Text alignSelf="center">Dark mode</Text>
            <CheckBox
              toggle
              onChange={(event) => setDarkMode(event.target.checked)}
              checked={isDarkMode}
            />
          </Box>{" "}
          <Box
            direction="row"
            gap="small"
            fill="horizontal"
            justify="between"
            pad={{ left: "8px" }}
          >
            <Text alignSelf="center">Show feedback</Text>
            <CheckBox
              toggle
              onChange={(event) => setFeedbackOn(event.target.checked)}
              checked={innerIsFeedbackOn}
            />
          </Box>
          <Box
            direction="row"
            gap="small"
            fill="horizontal"
            justify="between"
            pad={{ left: "8px" }}
          >
            <Text alignSelf="center">Background Image</Text>

            <Button
              size="small"
              label="Settings"
              onClick={() => setBackgroundImageSettingsShown(true)}
            />
          </Box>
          <Grid
            columns={{ count: 2, size: ["auto", "auto"] }}
            gap="small"
            pad={{ top: "medium", bottom: "small" }}
          >
            <Button label="Cancel" onClick={onCancel} />

            <Button
              primary
              label="Save"
              onClick={() => {
                onSave({
                  backgroundData,
                  isDarkMode,
                  isFeedbackOn: innerIsFeedbackOn,
                });
              }}
            />
          </Grid>
        </Box>
      </Modal>
      {isBackgroundImageSettingsShown && (
        <BackgroundImageSettings
          onCancel={() => setBackgroundImageSettingsShown(false)}
          onSave={(background) => {
            setBackgroundData(background);
            setBackgroundImageSettingsShown(false);
          }}
          background={background}
        />
      )}
    </>
  );
};
