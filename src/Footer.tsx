import { Box, Grid, Button } from "grommet";
import { Actions, Add } from "grommet-icons";
import { SaveButton } from "./components/SaveButton";
export const Footer = ({
  canvas,
  onAddButtonClicked,
  setSettingsMenuShown,
  gridArea,
}: {
  canvas: HTMLCanvasElement;
  onAddButtonClicked: () => void;
  setSettingsMenuShown: (value: boolean) => void;
} & { gridArea: string }) => {
  return (
    <Box gridArea={gridArea} pad={{ left: "small", right: "small" }}>
      <Grid
        columns={{
          count: 3,
          size: ["auto", "auto", "auto"],
        }}
        fill
        gap="small"
      >
        <Box align="start">
          <Button
            icon={<Actions />}
            onClick={() => setSettingsMenuShown(true)}
          />
        </Box>
        <Box align="center">
          <Button icon={<Add />} onClick={onAddButtonClicked} />
        </Box>
        <Box align="end">{<SaveButton canvas={canvas} />}</Box>
      </Grid>
    </Box>
  );
};
