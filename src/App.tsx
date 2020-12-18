import {
  Box,
  Button,
  CheckBox,
  Grid,
  grommet,
  Grommet,
  Layer,
  Stack,
  Text,
} from "grommet";
import React, { useMemo, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { ColorPickerSwatch } from "./components/ColorPickerSwatch";
import { CurrentColor } from "./components/CurrentColor";
import { DimensionPicker, ValidDimensions } from "./components/DimensionPicker";
import { Grid as ComponentGrid } from "./components/Grid";
import { LoadButton } from "./components/LoadButton";
import { SaveButton } from "./components/SaveButton";
import { ToggleButton } from "./components/ToggleButton";
import { RGBColor } from "./drivers/RGBColor";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import "./styles/App.css";
import { PaletteColourSwatch } from "./PaletteColorSwatch";
import { PalettePicker } from "./PalettePicker";
import { AvailablePalettes } from "./PaletteDictionary";
import { Undo, Redo, Add, Actions } from "grommet-icons";

function App() {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(8);
  const [color, setColor] = useState<RGBColor>(new RGBColor(0, 0, 0));
  const [isGridShown, setGridShown] = useState(false);
  const [isPickerShown, setPickerShown] = useState(false);
  const [isPaletteShown, setPaletteShown] = useState(false);
  const [palette, setPalette] = useState<AvailablePalettes>("c64");
  const [isCreateMenuShown, setCreateMenuShown] = useState(false);
  const [canvas, setCanvas] = useState<undefined | HTMLCanvasElement>();

  const paint = useMemo(() => {
    return new UndoablePaintCanvas(pixelDimensions);
  }, [pixelDimensions]);

  return (
    <Grommet theme={grommet} style={{ height: "100%" }}>
      <Grid
        fill
        areas={[
          { name: "canvas", start: [0, 0], end: [0, 0] },
          { name: "body", start: [0, 1], end: [0, 1] },
          { name: "footer", start: [0, 2], end: [0, 2] },
        ]}
        columns={["full"]}
        rows={["auto", "flex", "xxsmall"]}
      >
        <Stack gridArea="canvas" interactiveChild={isPickerShown ? 1 : "first"}>
          <CanvasContainer
            onCanvasCreated={(canvas) => {
              setCanvas(canvas);
              paint.setCanvas(canvas);
            }}
            pixelDimensions={pixelDimensions}
            onTouchEvent={(canvas, event) => {
              paint.setCanvas(canvas);
              paint.touchEvent(event, color);
              paint.drawToCanvas();
            }}
          />

          {isPickerShown && (
            <ColorPickerSwatch selectedColor={color} onColorPicked={setColor} />
          )}

          {canvas && isGridShown && (
            <ComponentGrid
              pixelDimensions={pixelDimensions}
              rootCanvas={canvas}
            />
          )}
        </Stack>
        <Box gridArea="body" background={"white"} pad="small">
          <Grid
            columns={{
              count: 2,
              size: ["auto", "auto"],
            }}
          >
            <Box direction="row" gap="small">
              <Button
                primary
                plain={false}
                icon={<Undo />}
                onClick={() => {
                  paint.undo();
                  paint.drawToCanvas();
                }}
              />
              <Button
                primary
                plain={false}
                icon={<Redo />}
                onClick={() => {
                  paint.redo();
                  paint.drawToCanvas();
                }}
              />
            </Box>
            <Box align="end">
              <CurrentColor color={color} />
            </Box>
          </Grid>
          <ColorPickerHistory onColorPicked={setColor} colorSelected={color} />

          <Button
            label="Clear Canvas"
            primary
            onClick={() => {
              paint.clear();
              if (paint.hasCanvas()) {
                paint.drawToCanvas();
              } else {
                console.warn("Tried to clear a canvas that doesn't exist");
              }
            }}
          ></Button>

          <CheckBox
            checked={isGridShown}
            onChange={() => setGridShown(!isGridShown)}
            label={"Grid"}
            toggle
          />
          <ToggleButton
            onToggle={() => setPickerShown(!isPickerShown)}
            text={isPickerShown ? "Hide Color Picker" : "Show Color Picker"}
          />
          <ToggleButton
            onToggle={() => setPaletteShown(!isPaletteShown)}
            text={
              isPaletteShown ? "Hide Palette Picker" : "Show Pallette Picker"
            }
          />
          {isPaletteShown && (
            <PalettePicker
              palette={palette}
              onPaletteChange={(palette) => setPalette(palette)}
            ></PalettePicker>
          )}
          {isPickerShown && (
            <PaletteColourSwatch
              onColorPicked={(color) => setColor(color)}
              palette={palette}
            ></PaletteColourSwatch>
          )}
        </Box>

        <Box
          gridArea="footer"
          background={"grey"}
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
              <Button
                icon={<Actions />}
                onClick={() => console.log("clicked")}
              />
            </Box>
            <Box align="center">
              <Button icon={<Add />} onClick={() => setCreateMenuShown(true)} />
            </Box>
            <Box align="end">{canvas && <SaveButton canvas={canvas} />}</Box>
          </Grid>
        </Box>
      </Grid>

      {isCreateMenuShown && (
        <Layer
          modal
          position="bottom"
          responsive={false}
          full="horizontal"
          onClickOutside={() => setCreateMenuShown(false)}
        >
          <Box pad="small" fill>
            <Box pad={{ top: "small", bottom: "small" }} gap="small">
              <Text>Canvas Dimensions</Text>
              <DimensionPicker
                onDimensionChange={setPixelDimensions}
                dimension={pixelDimensions}
              />
            </Box>
            <Box pad={{ top: "small", bottom: "small" }} gap="small">
              <Text>Upload Image (optional)</Text>
              <LoadButton
                setLoadedImage={(image) => {
                  paint.setPixelsFromImage(image);
                  paint.drawToCanvas();
                }}
              />
            </Box>

            <Grid
              columns={{ count: 2, size: ["auto", "auto"] }}
              gap="small"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button
                label="Cancel"
                onClick={() => setCreateMenuShown(false)}
              />

              <Button
                primary
                label="Create New"
                onClick={() => {
                  paint.clear();
                  paint.drawToCanvas();
                }}
              />
            </Grid>
          </Box>
        </Layer>
      )}
    </Grommet>
  );
}

export default App;
