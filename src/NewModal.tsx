import { Layer, Box, Button, Grid, Text } from "grommet";
import React from "react";
import { DimensionPicker, ValidDimensions } from "./components/DimensionPicker";
import { LoadButton } from "./components/LoadButton";

export const NewModal = ({
  onClickOutside,
  onDimensionChange,
  dimension,
  setLoadedImage,
  setCreateMenuShown,
  createNew,
}: {
  onClickOutside: () => void;
  onDimensionChange: (dimension: ValidDimensions) => void;
  dimension: ValidDimensions;
  setLoadedImage: (image: HTMLImageElement) => void;
  setCreateMenuShown: () => void;
  createNew: () => void;
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
        <Box pad={{ top: "small", bottom: "small" }} gap="small">
          <Text>Canvas Dimensions</Text>
          <DimensionPicker
            onDimensionChange={onDimensionChange}
            dimension={dimension}
          />
        </Box>
        <Box pad={{ top: "small", bottom: "small" }} gap="small">
          <Text>Upload Image (optional)</Text>
          <LoadButton setLoadedImage={setLoadedImage} />
        </Box>

        <Grid
          columns={{ count: 2, size: ["auto", "auto"] }}
          gap="small"
          pad={{ top: "medium", bottom: "small" }}
        >
          <Button label="Cancel" onClick={setCreateMenuShown} />

          <Button primary label="Create New" onClick={createNew} />
        </Grid>
      </Box>
    </Layer>
  );
};
