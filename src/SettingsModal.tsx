import { Box, Button, CheckBox, FormField, Grid, Select } from "grommet";
import { useState } from "react";
import { BackgroundColorForm } from "./BackgroundColorForm";
import { BackgroundImageForm } from "./BackgroundImageForm";
import { Modal } from "./Modal";
import { BackgroundColorData, Backgrounds, backgroundTypes } from "./Tools";

type SettingsData = {
  backgroundData: Backgrounds;
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
  background: Backgrounds;
  onCancel: () => void;
  onSave: (settingsData: SettingsData) => void;
  setDarkMode: (value: boolean) => void;
  isFeedbackOn: boolean;
}) => {
  const [backgroundType, setBackgroundType] = useState<Backgrounds["type"]>(
    background.type
  );
  const [backgroundData, setBackgroundData] = useState<Backgrounds | undefined>(
    background
  );
  const [innerIsFeedbackOn, setFeedbackOn] = useState(isFeedbackOn);

  const onBackgroundTypeChange = ({
    option,
  }: {
    option: Backgrounds["type"];
  }) => {
    setBackgroundType(option);
    switch (backgroundData?.type) {
      case "checkerboard":
        switch (option) {
          case "color":
            setBackgroundData(undefined);
            break;
          case "image":
            setBackgroundData(undefined);
            break;
        }
        break;
      case "color":
        switch (option) {
          case "checkerboard":
            setBackgroundData({ type: "checkerboard" });
            break;
          case "image":
            setBackgroundData(undefined);
            break;
        }
        break;
      case "image":
        switch (option) {
          case "checkerboard":
            setBackgroundData({ type: "checkerboard" });
            break;
          case "color":
            setBackgroundData({
              type: "color",
              color: backgroundData.color,
            });
            break;
        }
        break;
    }
  };

  return (
    <Modal onClose={onCancel} heading={"Settings"}>
      <Box gap="small">
        <CheckBox
          toggle
          onChange={(event) => setDarkMode(event.target.checked)}
          label={"Dark mode"}
          checked={isDarkMode}
        />
        <CheckBox
          toggle
          onChange={(event) => setFeedbackOn(event.target.checked)}
          label={"Show feedback"}
          checked={innerIsFeedbackOn}
        />
        <FormField label="Background image mode">
          <Select
            value={backgroundType}
            options={backgroundTypes}
            onChange={onBackgroundTypeChange}
          />
        </FormField>

        {backgroundType === "image" && (
          <BackgroundImageForm
            background={(backgroundData || background) as Backgrounds}
            onFormComplete={setBackgroundData}
          />
        )}

        {backgroundType === "color" && (
          <BackgroundColorForm
            color={
              (backgroundData as Partial<BackgroundColorData> | undefined)
                ?.color
            }
            onFormComplete={(data) => {
              setBackgroundData(data);
            }}
          />
        )}
        <Grid
          columns={{ count: 2, size: ["auto", "auto"] }}
          gap="small"
          pad={{ top: "medium", bottom: "small" }}
        >
          <Button label="Cancel" onClick={onCancel} />

          <Button
            primary
            label="Save"
            disabled={backgroundData === undefined}
            onClick={() => {
              onSave({
                backgroundData: backgroundData! as Backgrounds,
                isDarkMode,
                isFeedbackOn: innerIsFeedbackOn,
              });
            }}
          />
        </Grid>
      </Box>
    </Modal>
  );
};
