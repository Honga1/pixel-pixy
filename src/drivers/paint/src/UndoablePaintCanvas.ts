import { NoColor } from "../../color";
import { RGBColor } from "../../color/src/RGBColor";
import { KeyPairMap } from "./KeyPairMap";
import { PaintCanvas } from "./PaintCanvas";
import { UndoRedoBuffer } from "./UndoRedoBuffer";

export class UndoablePaintCanvas extends PaintCanvas {
  static AreColorsEqual = (
    colorA: RGBColor | NoColor,
    colorB: RGBColor | NoColor
  ) => {
    if (colorA === "NO_COLOR" && colorB === "NO_COLOR") {
      return true;
    }

    if (colorA === "NO_COLOR" && colorB !== "NO_COLOR") {
      return false;
    }

    if (colorA !== "NO_COLOR" && colorB === "NO_COLOR") {
      return false;
    }

    if (colorA !== "NO_COLOR" && colorB !== "NO_COLOR") {
      if (RGBColor.Equals(colorA, colorB)) {
        return true;
      }
    }
    return false;
  };

  undoBuffer: UndoRedoBuffer<KeyPairMap<number, number, RGBColor | "NO_COLOR">>;
  constructor(dimension: number) {
    super(dimension);

    this.undoBuffer = new UndoRedoBuffer<
      KeyPairMap<number, number, RGBColor | NoColor>
    >(this.getPixelMap().clone());
  }

  mutableMap(
    callbackfn: (
      coord: [x: number, y: number],
      color: RGBColor | NoColor
    ) => RGBColor | NoColor
  ) {
    super.mutableMap(callbackfn);
    this.undoBuffer.addCurrent(this.getPixelMap().clone());
  }

  setColorAt(x: number, y: number, color: RGBColor | NoColor) {
    super.setColorAt(x, y, color);
    this.undoBuffer.addCurrent(this.getPixelMap().clone());
  }

  undo() {
    const undo = this.undoBuffer.undo();
    this.setPixelMap(undo);
  }

  redo() {
    const redo = this.undoBuffer.redoOne();
    if (redo !== undefined) {
      this.setPixelMap(redo);
    }
  }

  fillWithColor(x: number, y: number, fillColor: RGBColor | NoColor) {
    const startColor = this.getColorAt(x, y);

    const visited = new KeyPairMap<number, number, boolean>();
    this.getPixelMap()
      .clone()
      .forEach((color, [x, y]) => {
        visited.set([x, y], false);
      });

    this.floodFill(x, y, fillColor, startColor, visited);
    this.undoBuffer.addCurrent(this.getPixelMap().clone());
  }

  private floodFill(
    x: number,
    y: number,
    fillColor: RGBColor | NoColor,
    startColor: RGBColor | NoColor,
    visited: KeyPairMap<number, number, boolean>
  ) {
    if (!this.cellExists(x, y)) return;
    if (visited.get([x, y]) === true) return;

    const cellColor = this.getColorAt(x, y);
    if (!UndoablePaintCanvas.AreColorsEqual(cellColor, startColor)) return;

    super.setColorAt(x, y, fillColor);
    visited.set([x, y], true);

    if (visited.get([x, y + 1]) === false)
      this.floodFill(x, y + 1, fillColor, startColor, visited);

    if (visited.get([x, y - 1]) === false)
      this.floodFill(x, y - 1, fillColor, startColor, visited);

    if (visited.get([x + 1, y]) === false)
      this.floodFill(x + 1, y, fillColor, startColor, visited);

    if (visited.get([x - 1, y]) === false)
      this.floodFill(x - 1, y, fillColor, startColor, visited);
  }

  private cellExists = (x: number, y: number) => this.getPixelMap().has([x, y]);
}
