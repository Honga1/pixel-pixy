import { Box, Button, Grid, grommet, Grommet, Stack } from "grommet";
import {
  Actions,
  Add,
  Brush,
  Erase,
  Grid as GridIcon,
  Redo,
  Undo,
} from "grommet-icons";
import React, { useMemo, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { ColorPickerSwatch } from "./components/ColorPickerSwatch";
import { ValidDimensions } from "./components/DimensionPicker";
import { Grid as ComponentGrid } from "./components/Grid";
import { PaletteIcon } from "./components/PaletteIcon";
import { SaveButton } from "./components/SaveButton";
import { ToggleButton } from "./components/ToggleButton";
import { NoColor, RGBColor } from "./drivers/RGBColor";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import { NewModal } from "./NewModal";
import { PaletteColourSwatch } from "./PaletteColorSwatch";
import { AvailablePalettes } from "./PaletteDictionary";
import { PalettePicker } from "./PalettePicker";
import "./styles/App.css";

function App() {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(8);
  const [color, setColor] = useState<RGBColor>(new RGBColor(0, 0, 0));

  const setColorMode = (color: RGBColor | NoColor) => {
    if (color === RGBColor.NO_COLOR) {
      setIsErasing(true);
    } else {
      setIsErasing(false);
      setColor(color);
    }
  };
  const [isErasing, setIsErasing] = useState(false);
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
    <Grommet theme={grommet} style={{ height: "100%" }} themeMode="dark">
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
              paint.touchEvent(event, isErasing ? RGBColor.NO_COLOR : color);
              paint.drawToCanvas();
            }}
          />

          {isPickerShown && (
            <ColorPickerSwatch
              selectedColor={color}
              onColorPicked={setColorMode}
            />
          )}

          {canvas && isGridShown && (
            <ComponentGrid
              pixelDimensions={pixelDimensions}
              rootCanvas={canvas}
            />
          )}
        </Stack>
        <Box gridArea="body" pad="small">
          <Grid
            columns={{
              count: 3,
              size: ["auto", "auto", "auto"],
            }}
            rows="flex"
          >
            <Box direction="row" gap="small">
              <Button
                icon={<Undo />}
                onClick={() => {
                  paint.undo();
                  paint.drawToCanvas();
                }}
              />
              <Button
                icon={<Redo />}
                onClick={() => {
                  paint.redo();
                  paint.drawToCanvas();
                }}
              />
            </Box>
            <Box align="center" justify="center">
              <Button
                icon={<GridIcon />}
                style={{
                  borderRadius: "18px",
                  boxShadow: isGridShown ? "0 0 2px 2px green" : "none",
                }}
                onClick={() => setGridShown(!isGridShown)}
              />
            </Box>
            <Box align="end" justify="end" direction="row" gap="small">
              <Button
                style={{
                  // background: `url(${checkboardImageSrc})`,
                  backgroundSize: "20%",
                  borderRadius: "18px",
                  boxShadow: isErasing ? "0 0 2px 2px green" : "none",
                }}
                onClick={() => setColorMode(RGBColor.NO_COLOR)}
                icon={<Erase />}
              />
              <Button
                primary
                style={{
                  boxShadow: !isErasing ? "0 0 2px 2px green" : "none",
                }}
                color={color.toHex()}
                icon={<Brush />}
                onClick={() => setColorMode(color)}
              />
            </Box>
          </Grid>
          <ColorPickerHistory onColorPicked={setColor} colorSelected={color} />

          <ToggleButton
            onToggle={() => setPickerShown(!isPickerShown)}
            text={isPickerShown ? "Hide Color Picker" : "Show Color Picker"}
          />
          <Button
            onClick={() => setPaletteShown(!isPaletteShown)}
            icon={<PaletteIcon />}
          />
          {isPaletteShown && (
            <PalettePicker
              palette={palette}
              onPaletteChange={(palette) => setPalette(palette)}
            ></PalettePicker>
          )}
          {isPickerShown && (
            <PaletteColourSwatch
              onColorPicked={(color) => setColorMode(color)}
              palette={palette}
            ></PaletteColourSwatch>
          )}
        </Box>

        <Box
          gridArea="footer"
          direction="row"
          // background="black"
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
        <NewModal
          onClickOutside={() => setCreateMenuShown(false)}
          onClickClear={() => {
            paint.clear();
            if (paint.hasCanvas()) {
              paint.drawToCanvas();
            } else {
              console.warn("Tried to clear a canvas that doesn't exist");
            }
          }}
          onDimensionChange={setPixelDimensions}
          dimension={pixelDimensions}
          setLoadedImage={(image) => {
            paint.setPixelsFromImage(image);
            paint.drawToCanvas();
          }}
          setCreateMenuShown={() => setCreateMenuShown(false)}
          createNew={() => {
            paint.clear();
            paint.drawToCanvas();
          }}
        ></NewModal>
      )}
    </Grommet>
  );
}

export default App;
