import { Box, Grid, Button } from "grommet";
import { Actions, Add } from "grommet-icons";
import { SaveButton } from "./components/SaveButton";
export const Footer = ({
  canvas,
  setCreateMenuShown,
}: {
  canvas: HTMLCanvasElement;
  setCreateMenuShown: (value: boolean) => void;
}) => {
  return (
    <Box
      gridArea="footer"
      direction="row"
      pad={{ left: "small", right: "small" }}
    >
      <Grid
        columns={{
          count: 3,
          size: ["auto", "auto", "auto"],
        }}
        fill
        gap="small"
      >
        <Box align="start">
          <Button icon={<Actions />} onClick={() => console.log("clicked")} />
        </Box>
        <Box align="center">
          <Button icon={<Add />} onClick={() => setCreateMenuShown(true)} />
        </Box>
        <Box align="end">{<SaveButton canvas={canvas} />}</Box>
      </Grid>
    </Box>
  );
};
