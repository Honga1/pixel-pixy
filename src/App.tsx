import React, { useEffect, useMemo, useState } from "react";
import "./styles/App.css";
import { CanvasContainer } from "./components/CanvasContainer";
import { ColorPickerHistory } from "./components/ColorPickerHistory";
import { CurrentColor } from "./components/CurrentColor";
import { LoadButton } from "./components/LoadButton";
import { SaveButton } from "./components/SaveButton";
import { ClearButton } from "./components/ClearButton";
import { Grid } from "./components/Grid";
import { ToggleButton } from "./components/ToggleButton";
import { ColorPickerSwatch } from "./components/ColorPickerSwatch";
import { DimensionPicker, ValidDimensions } from "./components/DimensionPicker";
import { RGBColor } from "./drivers/RGBColor";
import { PaintCanvas } from "./drivers/PaintCanvas";

function App() {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(8);
  const [color, setColor] = useState<RGBColor>(new RGBColor(0, 0, 0));
  const [isGridShown, setGridShown] = useState(false);
  const [isPickerShown, setPickerShown] = useState(false);
  const [canvas, setCanvas] = useState<undefined | HTMLCanvasElement>();
  const [loadedImage, setLoadedImage] = useState<
    HTMLImageElement | undefined
  >();

  const paint = useMemo(() => new PaintCanvas(pixelDimensions), [
    pixelDimensions,
  ]);

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
        loadedImage={loadedImage}
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
      <ColorPickerHistory onColorPicked={setColor} colorSelected={color} />
      <CurrentColor color={color} />
      <LoadButton setLoadedImage={setLoadedImage} />
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
