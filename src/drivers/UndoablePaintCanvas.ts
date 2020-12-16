import { KeyPairMap } from "./KeyPairMap";
import { PaintCanvas } from "./PaintCanvas";
import { NoColor, RGBColor } from "./RGBColor";
import { UndoRedoBuffer } from "./UndoRedoBuffer";

export class UndoablePaintCanvas extends PaintCanvas {
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
}
