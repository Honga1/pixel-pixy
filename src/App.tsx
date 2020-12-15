import React, { useState } from "react";
import "./styles/App.css";
import { CanvasContainer } from "./CanvasContainer";
import { ColorPickerHistory } from "./ColorPickerHistory";
import { CurrentColor } from "./CurrentColor";
import { LoadButton } from "./LoadButton";
import { SaveButton } from "./SaveButton";
import { ClearButton } from "./ClearButton";
import { Grid } from "./Grid";
import { ToggleButton } from "./ToggleButton";
import { ColorPickerSwatch } from "./ColorPickerSwatch";
import { DimensionPicker, ValidDimensions } from "./DimensionPicker";

function App() {
  const [pixelDimensions, setPixelDimensions] = useState<ValidDimensions>(8);

  const [color, setColor] = useState<string>("black");
  const [isGridShown, setGridShown] = useState(false);
  const [isPickerShown, setPickerShown] = useState(false);
  const [canvas, setCanvas] = useState<undefined | HTMLCanvasElement>();
  const [loadedImage, setLoadedImage] = useState<
    HTMLImageElement | undefined
  >();
  const [clearCounter, setClearCounter] = useState(0);

  return (
    <div className="App">
      {isPickerShown && (
        <ColorPickerSwatch selectedColor={color} onColorPicked={setColor} />
      )}
      <CanvasContainer
        onCanvasCreated={setCanvas}
        color={color}
        loadedImage={loadedImage}
        changeToClear={clearCounter}
        pixelDimensions={pixelDimensions}
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
          setClearCounter(clearCounter + 1);
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
