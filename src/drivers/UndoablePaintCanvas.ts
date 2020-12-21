import { getRelativeClickPosition } from "./getRelativeClickPosition";
import { KeyPairMap } from "./KeyPairMap";
import { NoColor, RGBColor } from "./RGBColor";
import { UndoRedoBuffer } from "./UndoRedoBuffer";

export class PaintCanvas {
  static DrawToCanvas(paintCanvas: PaintCanvas, canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get context for canvas");
    paintCanvas.forEach(([x, y], color) => {
      if (color === RGBColor.NO_COLOR) {
        context.clearRect(x, y, 1, 1);
        return;
      }

      context.fillStyle = color.toHex();
      context.fillRect(x, y, 1, 1);
    });
  }

  static AreDimensionsCompatible(
    paintCanvas: PaintCanvas,
    canvas: HTMLCanvasElement
  ) {
    const { width, height } = canvas;
    const dimension = paintCanvas.dimension();

    if (width !== height) {
      return false;
    }

    if (dimension !== width) {
      return false;
    }

    return true;
  }

  drawToCanvas() {
    if (this.canvas === undefined) {
      throw new Error("Cannot draw to canvas, no canvas set");
    }

    PaintCanvas.DrawToCanvas(this, this.canvas);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    if (!PaintCanvas.AreDimensionsCompatible(this, canvas)) {
      throw new RangeError(
        `PaintCanvas and HTMLCanvas should be square and the same dimensions. Got PaintCanvas: ${this.dimension()} canvas: ${
          canvas.width
        }x${canvas.height}`
      );
    }

    this.canvas = canvas;
  }

  hasCanvas(): boolean {
    return this.canvas !== undefined;
  }

  getCanvas(): HTMLCanvasElement | undefined {
    return this.canvas;
  }

  private pixelMap = new KeyPairMap<number, number, RGBColor | NoColor>();

  getPixelMap() {
    return this.pixelMap;
  }

  setPixelMap(map: KeyPairMap<number, number, RGBColor | "NO_COLOR">) {
    if (map.size !== this.pixelMap.size) {
      throw new RangeError(
        "Cannot set pixel map. Pixel maps are not the same dimensions"
      );
    }
    this.pixelMap = map.clone();
  }

  setPixelsFromImage(image: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get context for canvas");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    context.drawImage(image, 0, 0);

    this.setPixelsFromCanvas(canvas);
  }

  setPixelsFromCanvas(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get context for canvas");

    const xIntervals = canvas.width / this.dimension();
    const yIntervals = canvas.height / this.dimension();
    this.mutableMap(([x, y]) => {
      const { data } = context.getImageData(
        x * xIntervals,
        y * yIntervals,
        1,
        1
      );

      const [r, g, b, a] = data;
      const color = a === 0 ? RGBColor.NO_COLOR : new RGBColor(r, g, b);
      return color;
    });
  }

  clear() {
    this.mutableMap(() => RGBColor.NO_COLOR);
  }

  setColorAt(x: number, y: number, color: RGBColor | NoColor) {
    const isPixelInRange = this.pixelMap.has([x, y]);

    if (!isPixelInRange) {
      throw RangeError(`Pixel at ${x},${y} does not exist`);
    }

    this.pixelMap.set([x, y], color);
  }

  getColorAt(x: number, y: number): RGBColor | NoColor {
    const maybeColor = this.pixelMap.get([x, y]);

    if (maybeColor === undefined)
      throw RangeError(`Pixel at ${x},${y} does not exist`);

    return maybeColor;
  }

  mutableMap(
    callbackfn: (
      coord: [x: number, y: number],
      color: RGBColor | NoColor
    ) => RGBColor | NoColor
  ) {
    for (let [key, value] of this.pixelMap.entries()) {
      const result = callbackfn(key, value);
      this.pixelMap.set(key, result);
    }
  }

  forEach(
    callbackfn: (
      coord: [x: number, y: number],
      color: RGBColor | NoColor
    ) => void
  ) {
    for (let [key, value] of this.pixelMap.entries()) {
      callbackfn(key, value);
    }
  }
  private canvas?: HTMLCanvasElement;

  constructor(dimension: number) {
    for (let x = 0; x < dimension; x++) {
      for (let y = 0; y < dimension; y++) {
        const keys = [x, y] as [number, number];
        const color = RGBColor.NO_COLOR;
        this.pixelMap.set(keys, color);
      }
    }
  }

  dimension(): number {
    return Math.sqrt(this.pixelMap.size);
  }

  touchEvent(event: React.TouchEvent<HTMLElement>, color: RGBColor | NoColor) {
    const { quantX, quantY } = this.touchToCoords(event);

    const currentColor = this.getColorAt(quantX, quantY);

    if (color === "NO_COLOR" && currentColor === "NO_COLOR") {
      return;
    }

    if (color === "NO_COLOR" && currentColor !== "NO_COLOR") {
      this.setColorAt(quantX, quantY, color);
      return;
    }

    if (color !== "NO_COLOR" && currentColor === "NO_COLOR") {
      this.setColorAt(quantX, quantY, color);
      return;
    }

    if (color !== "NO_COLOR" && currentColor !== "NO_COLOR") {
      if (!RGBColor.Equals(color, currentColor)) {
        this.setColorAt(quantX, quantY, color);
      }
    }
  }

  touchToCoords(event: React.TouchEvent<HTMLElement>) {
    const { relativeX, relativeY } = getRelativeClickPosition(event);
    const scaledX = relativeX * this.dimension();
    const scaledY = relativeY * this.dimension();
    const quantX = Math.floor(scaledX);
    const quantY = Math.floor(scaledY);
    return { quantX, quantY };
  }
}

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
