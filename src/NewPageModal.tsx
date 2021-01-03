import { Box, Button, Grid, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { DimensionPicker, ValidDimensions } from "./components/DimensionPicker";
import { LoadButton } from "./components/LoadButton";
import { Modal } from "./modals/Modal";

export const NewPageModal = ({
  currentDimension,
  onCancel,
  onCreateNew,
}: {
  currentDimension: ValidDimensions;
  onCancel: () => void;
  onCreateNew: (
    dimension: ValidDimensions,
    loadedImage?: HTMLImageElement
  ) => void;
}) => {
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement>();
  const [dimension, setDimension] = useState<ValidDimensions>(currentDimension);

  useEffect(() => {
    setDimension(currentDimension);
  }, [currentDimension]);

  return (
    <Modal onClose={onCancel} heading="New Drawing">
      <DimensionPicker onDimensionChange={setDimension} dimension={dimension} />
      <Box
        direction="row"
        gap="small"
        fill="horizontal"
        justify="between"
        pad={{ left: "8px" }}
      >
        <Text alignSelf="center">Upload Image (optional)</Text>
        <LoadButton setLoadedImage={setLoadedImage} />
      </Box>

      <Grid
        columns={{ count: 2, size: ["auto", "auto"] }}
        gap="small"
        pad={{ top: "medium", bottom: "small" }}
      >
        <Button label="Cancel" onClick={onCancel} />

        <Button
          primary
          label="Create New"
          onClick={() => onCreateNew(dimension, loadedImage)}
        />
      </Grid>
    </Modal>
  );
};
