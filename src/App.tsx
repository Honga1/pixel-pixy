import React, { useMemo, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { ClearButton } from "./components/ClearButton";
import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { ColorPickerSwatch } from "./components/ColorPickerSwatch";
import { CurrentColor } from "./components/CurrentColor";
import { DimensionPicker, ValidDimensions } from "./components/DimensionPicker";
import { Grid } from "./components/Grid";
import { LoadButton } from "./components/LoadButton";
import { SaveButton } from "./components/SaveButton";
import { ToggleButton } from "./components/ToggleButton";
import { RGBColor } from "./drivers/RGBColor";
import { UndoablePaintCanvas } from "./drivers/UndoablePaintCanvas";
import "./styles/App.css";
import { ColorSwatchC64 } from "./ColorSwatchC64";

function App() {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(1);
  const [color, setColor] = useState<RGBColor>(new RGBColor(0, 0, 0));
  const [isGridShown, setGridShown] = useState(false);
  const [isPickerShown, setPickerShown] = useState(false);
  const [canvas, setCanvas] = useState<undefined | HTMLCanvasElement>();

  const paint = useMemo(() => {
    return new UndoablePaintCanvas(pixelDimensions);
  }, [pixelDimensions]);

  return (
    <div className="App">
      {isPickerShown && (
        <ColorPickerSwatch selectedColor={color} onColorPicked={setColor} />
      )}
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
      {canvas && isGridShown && (
        <Grid pixelDimensions={pixelDimensions} rootCanvas={canvas} />
      )}
      <ColorSwatchC64 selectedColor={"red"} />
      <ColorPickerHistory onColorPicked={setColor} colorSelected={color} />
      <CurrentColor color={color} />
      <LoadButton
        setLoadedImage={(image) => {
          paint.setPixelsFromImage(image);
          paint.drawToCanvas();
        }}
      />
      {canvas && <SaveButton canvas={canvas} />}
      <ClearButton
        onClearPressed={() => {
          paint.clear();
          if (paint.hasCanvas()) {
            paint.drawToCanvas();
          } else {
            console.warn("Tried to clear a canvas that doesn't exist");
          }
        }}
      />

      <button
        onTouchEnd={() => {
          paint.undo();
          paint.drawToCanvas();
        }}
      >
        Undo
      </button>
      <button
        onTouchEnd={() => {
          paint.redo();
          paint.drawToCanvas();
        }}
      >
        Redo
      </button>
      <ToggleButton
        onToggle={() => setGridShown(!isGridShown)}
        text={isGridShown ? "Hide Grid" : "Show Grid"}
      />
      <ToggleButton
        onToggle={() => setPickerShown(!isPickerShown)}
        text={isPickerShown ? "Hide Color Picker" : "Show Color Picker"}
      />
      <DimensionPicker
        onDimensionChange={setPixelDimensions}
        dimension={pixelDimensions}
      />
    </div>
  );
}

export default App;
