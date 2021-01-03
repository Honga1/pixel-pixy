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

    const didPixelsChange = this.floodFill(
      x,
      y,
      fillColor,
      startColor,
      visited
    );

    if (didPixelsChange) {
      this.undoBuffer.addCurrent(this.getPixelMap().clone());
    }
  }
  /**
   *
   * @param x
   * @param y
   * @param fillColor The requested color to fill with
   * @param startColor The current color of the cell requested to be filled from
   * @param visited A map of the board indicating if that cell has been checked already
   */
  private floodFill(
    x: number,
    y: number,
    fillColor: RGBColor | NoColor,
    startColor: RGBColor | NoColor,
    visited: KeyPairMap<number, number, boolean>
  ): boolean {
    const isCellOnBoard = !this.cellExists(x, y);
    if (isCellOnBoard) return false;

    const hasCellAlreadyBeenVisited = visited.get([x, y]) === true;
    if (hasCellAlreadyBeenVisited) return false;

    const cellColor = this.getColorAt(x, y);
    const doesCellMatchStartColor = UndoablePaintCanvas.AreColorsEqual(
      cellColor,
      startColor
    );
    if (!doesCellMatchStartColor) return false;

    const doesCellMatchFillColor = UndoablePaintCanvas.AreColorsEqual(
      cellColor,
      fillColor
    );

    visited.set([x, y], true);
    if (doesCellMatchFillColor) {
      return false;
    }

    super.setColorAt(x, y, fillColor);

    const edges = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ];

    edges.forEach(([x, y]) =>
      this.floodFill(x, y, fillColor, startColor, visited)
    );

    return true;
  }

  private cellExists = (x: number, y: number) => this.getPixelMap().has([x, y]);
}
