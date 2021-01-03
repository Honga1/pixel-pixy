import { Box, Button, FormField, Grid, Image, Select, Text } from "grommet";
import { useState } from "react";
import { LoadButton } from "../components/LoadButton";
import { RGBColor } from "../drivers/Color";
import defaultImageSrc from "../images/checker-board.png";
import { Modal } from "./Modal";
import { PaletteModal } from "./PaletteModal";
import { Background, backgroundTypes } from "../Tools";

export const BackgroundImageSettings = ({
  onCancel,
  onSave,
  background: outerBackgroundData,
}: {
  background: Background;
  onCancel: () => void;
  onSave: (background: Background) => void;
}) => {
  const [background, setBackground] = useState<Background>(outerBackgroundData);
  const [isPaletteModalShown, setPaletteMenuShown] = useState(false);

  const onBackgroundTypeChange = ({
    option,
  }: {
    option: Background["type"];
  }) => {
    setBackground({ ...background, type: option });
  };

  return (
    <>
      <Modal onClose={onCancel} heading={"Background Image Settings"}>
        <FormField label="Mode">
          <Select
            value={background.type}
            options={backgroundTypes}
            onChange={onBackgroundTypeChange}
          />
        </FormField>

        {background.type === "image" && (
          <Box gap="small">
            <FormField label="Image fill mode" name="select">
              <Select
                value={outerBackgroundData.size}
                options={["cover", "contain"]}
                onChange={({ option: size }: { option: Background["size"] }) =>
                  setBackground({ ...background, size })
                }
              />
            </FormField>

            <Box
              direction="row"
              gap="small"
              fill="horizontal"
              justify="between"
              pad={{ left: "8px" }}
            >
              <Text alignSelf="center">Background Image</Text>
              <LoadButton
                setLoadedImage={(image) =>
                  setBackground({ ...background, image })
                }
              />
            </Box>

            <Box width="small" height="small" pad="small">
              <Image
                style={{ backgroundColor: background.color.toHex() }}
                src={background.image?.src || defaultImageSrc}
                fit={background.size}
              />
            </Box>
          </Box>
        )}

        {background.type !== "checkerboard" && (
          <Box
            direction="row"
            gap="small"
            fill="horizontal"
            justify="between"
            pad={{ left: "8px" }}
          >
            <Text alignSelf="center">Background color</Text>
            <Button
              size="small"
              primary
              color={(background.color as RGBColor).toHex()}
              label={"Select color"}
              onClick={() => setPaletteMenuShown(true)}
            />
          </Box>
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
            onClick={() => {
              onSave(background);
            }}
          />
        </Grid>
      </Modal>
      {isPaletteModalShown && (
        <PaletteModal
          onCancel={() => setPaletteMenuShown(false)}
          setColor={(color) => setBackground({ ...background, color })}
        />
      )}
    </>
  );
};
