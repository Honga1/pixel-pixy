import { getRelativeClickPosition } from "./getRelativeClickPosition";
import { KeyPairMap } from "./KeyPairMap";
import { NoColor, RGBColor } from "./RGBColor";

export class PaintCanvas {
  static DrawToCanvas(paintCanvas: PaintCanvas, htmlCanvas: HTMLCanvasElement) {
    const context = htmlCanvas.getContext("2d");
    if (!context) throw new Error("Could not get context for canvas");
    paintCanvas.forEach(([x, y], color) => {
      if (color === "NO_COLOR") {
        context.clearRect(x, y, 1, 1);
        return;
      }

      context.fillStyle = color.toHex();
      context.fillRect(x, y, 1, 1);
    });
  }

  static AreDimensionsCompatible(
    paintCanvas: PaintCanvas,
    htmlCanvas: HTMLCanvasElement
  ) {
    const { width, height } = htmlCanvas;
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

  getCanvas(): HTMLCanvasElement | undefined {
    return this.canvas;
  }

  private pixelMap = new KeyPairMap<number, number, RGBColor | NoColor>();

  getPixelMap() {
    return this.pixelMap;
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
    const { relativeX, relativeY } = getRelativeClickPosition(event);
    const scaledX = relativeX * this.dimension();
    const scaledY = relativeY * this.dimension();
    const quantX = Math.floor(scaledX);
    const quantY = Math.floor(scaledY);

    this.setColorAt(quantX, quantY, color);
  }
}
