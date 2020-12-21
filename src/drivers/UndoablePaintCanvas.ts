import { NoColor, RGBColor } from "./Color";
import { getRelativeClickPosition } from "./getRelativeClickPosition";

export class KeyPairMap<KeyA, KeyB, Value> implements Map<[KeyA, KeyB], Value> {
  constructor(keyPairMap?: KeyPairMap<KeyA, KeyB, Value>) {
    if (!keyPairMap) return;

    for (let [[keyA, keyB], value] of keyPairMap) {
      this.set([keyA, keyB], value);
    }
  }

  private map = new Map<KeyA, Map<KeyB, Value>>();

  clear(): void {
    this.map.clear();
  }

  delete([keyA, keyB]: [KeyA, KeyB]): boolean {
    return this.map.get(keyA)?.delete(keyB) || false;
  }

  clone(): KeyPairMap<KeyA, KeyB, Value> {
    return new KeyPairMap(this);
  }

  forEach(
    callbackfn: (
      value: Value,
      key: [KeyA, KeyB],
      map: Map<[KeyA, KeyB], Value>
    ) => void,
    thisArg?: any
  ): void {
    const refMap = this.toRefMap();

    refMap.forEach(callbackfn, thisArg);
  }

  private toRefMap() {
    const tempMap = new Map<[KeyA, KeyB], Value>();
    this.map.forEach((innerMap, keyA, outerMap) => {
      innerMap.forEach((value, keyB, innerMap) => {
        const keys = [keyA, keyB] as [KeyA, KeyB];
        tempMap.set(keys, value);
      });
    });
    return tempMap;
  }

  get([keyA, keyB]: [KeyA, KeyB]): Value | undefined {
    return this.map.get(keyA)?.get(keyB);
  }

  has([keyA, keyB]: [KeyA, KeyB]): boolean {
    return this.map.get(keyA)?.has(keyB) || false;
  }

  set([keyA, keyB]: [KeyA, KeyB], value: Value): this {
    const hasKeyA = this.map.has(keyA);

    if (!hasKeyA) {
      this.map.set(keyA, new Map());
    }
    this.map.get(keyA)!.set(keyB, value);

    return this;
  }

  get size() {
    return this.toRefMap().size;
  }

  [Symbol.iterator](): IterableIterator<[[KeyA, KeyB], Value]> {
    return this.toRefMap()[Symbol.iterator]();
  }

  entries(): IterableIterator<[[KeyA, KeyB], Value]> {
    return this.toRefMap().entries();
  }

  keys(): IterableIterator<[KeyA, KeyB]> {
    return this.toRefMap().keys();
  }

  values(): IterableIterator<Value> {
    return this.toRefMap().values();
  }

  toString(): string {
    let lines = [];

    for (let [key, value] of this) {
      lines.push(`${key[0]}, ${key[1]}, ${value}`);
    }

    return lines.join("\n");
  }
  [Symbol.toStringTag]: string;
}

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

export class UndoBuffer<T> {
  buffer: T[];

  constructor(private base: T, private maxSize?: number) {
    this.buffer = [base];
  }

  top() {
    return this.buffer[this.buffer.length - 1] as T | undefined;
  }

  undo() {
    this.buffer.pop();
    const maybeReverseState = this.buffer[this.buffer.length - 1] as
      | T
      | undefined;
    if (maybeReverseState) {
      return maybeReverseState;
    } else {
      this.buffer = [this.base];
      return this.base;
    }
  }

  addCurrent(value: T) {
    this.buffer.push(value);

    if (this.maxSize && this.maxSize < this.buffer.length) {
      this.buffer = this.buffer.slice(-this.maxSize - 2);
    }
  }

  getUndoSize() {
    return Math.max(this.buffer.length - 2, 0);
  }

  getBufferLength() {
    return this.buffer.length;
  }

  clear() {
    this.buffer = [];
  }
}

export class UndoRedoBuffer<T> extends UndoBuffer<T> {
  private redoBuffer = new Array<T>();

  undo(): T {
    const maybeTop = this.top();
    if (maybeTop !== undefined && this.getBufferLength() > 1) {
      this.redoBuffer.push(maybeTop);
    }

    const previousPoint = super.undo();
    return previousPoint;
  }

  addCurrent(value: T) {
    this.redoBuffer = [];
    super.addCurrent(value);
  }

  getUndoSize() {
    return super.getUndoSize();
  }

  getRedoSize() {
    return this.redoBuffer.length;
  }

  redoOne(): T | undefined {
    const redid = this.redoBuffer.pop();
    if (redid !== undefined) {
      super.addCurrent(redid);
    }

    return redid;
  }

  clear() {
    this.redoBuffer = [];
    super.clear();
  }
}
