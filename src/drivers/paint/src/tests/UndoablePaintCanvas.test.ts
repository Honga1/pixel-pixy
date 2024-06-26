import { RGBColor } from "../../../color";
import { createCanvas, loadImage } from "canvas";
import { UndoablePaintCanvas } from "../UndoablePaintCanvas";

it("Can be created", () => {
  expect(() => new UndoablePaintCanvas(5)).not.toThrow();
});

it("Can set color", () => {
  const paint = new UndoablePaintCanvas(5);
  paint.setColorAt(0, 0, new RGBColor(255, 0, 0));
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
});

it("Can undo color", () => {
  const paint = new UndoablePaintCanvas(5);
  paint.setColorAt(0, 0, new RGBColor(255, 0, 0));
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  paint.undo();
  expect(paint.getColorAt(0, 0)).toStrictEqual(RGBColor.NO_COLOR);
});

it("Can redo color", () => {
  const paint = new UndoablePaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 0, 0));
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  paint.undo();
  expect(paint.getColorAt(0, 0)).toStrictEqual(RGBColor.NO_COLOR);
  paint.redo();
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
});

it("Can add color, undo, add color, undo", () => {
  const paint = new UndoablePaintCanvas(2);
  paint.setColorAt(0, 0, new RGBColor(255, 0, 0));
  paint.setColorAt(1, 0, new RGBColor(255, 0, 0));
  paint.setColorAt(1, 1, new RGBColor(255, 0, 0));
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  paint.undo();
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect(paint.getColorAt(1, 1)).toStrictEqual(RGBColor.NO_COLOR);
  paint.setColorAt(0, 1, new RGBColor(255, 0, 0));
  paint.undo();
  paint.setColorAt(0, 1, new RGBColor(255, 0, 0));
  paint.undo();
  paint.undo();
  paint.undo();
  expect(paint.getColorAt(0, 1)).toStrictEqual(RGBColor.NO_COLOR);

  expect(paint.getColorAt(0, 0)).toStrictEqual(RGBColor.NO_COLOR);
});

it("Can clear", () => {
  const paint = new UndoablePaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 255, 255));
  const maybeColor = paint.getColorAt(0, 0);
  expect(maybeColor instanceof RGBColor).toBeTruthy();
  expect((maybeColor as RGBColor).rgb).toStrictEqual([255, 255, 255]);
  paint.clear();
  expect(paint.getColorAt(0, 0)).toEqual(RGBColor.NO_COLOR);
});

it("Can undo clear", () => {
  const paint = new UndoablePaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 255, 255));
  paint.clear();
  expect(paint.getColorAt(0, 0)).toEqual(RGBColor.NO_COLOR);
  paint.undo();
  const maybeColor = paint.getColorAt(0, 0);
  expect(maybeColor instanceof RGBColor).toBeTruthy();
  expect((maybeColor as RGBColor).rgb).toStrictEqual([255, 255, 255]);
});

it("Can redo clear", () => {
  const paint = new UndoablePaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 255, 255));
  paint.clear();
  expect(paint.getColorAt(0, 0)).toEqual(RGBColor.NO_COLOR);
  paint.undo();
  paint.redo();
  expect(paint.getColorAt(0, 0)).toEqual(RGBColor.NO_COLOR);
});

it("Can load from image", async () => {
  const paint = new UndoablePaintCanvas(10);

  const canvas = createCanvas(100, 100);
  const context = canvas.getContext("2d");
  context.fillStyle = "red";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

  const image = await loadImage(canvas.toDataURL());

  expect(image.naturalWidth).toEqual(canvas.width);
  expect(image.naturalHeight).toEqual(canvas.height);

  paint.setPixelsFromImage((image as unknown) as HTMLImageElement);
  expect((paint.getColorAt(9, 9) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([0, 0, 255]);
});

it("Can undo load from image", async () => {
  const paint = new UndoablePaintCanvas(10);

  const canvas = createCanvas(100, 100);
  const context = canvas.getContext("2d");
  context.fillStyle = "red";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

  const image = await loadImage(canvas.toDataURL());

  paint.setPixelsFromImage((image as unknown) as HTMLImageElement);
  expect((paint.getColorAt(9, 9) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([0, 0, 255]);
  paint.undo();
  expect(paint.getColorAt(9, 9)).toStrictEqual(RGBColor.NO_COLOR);
  expect(paint.getColorAt(0, 0)).toStrictEqual(RGBColor.NO_COLOR);
});

it("Can redo load from image", async () => {
  const paint = new UndoablePaintCanvas(10);

  const canvas = createCanvas(100, 100);
  const context = canvas.getContext("2d");
  context.fillStyle = "red";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
  const image = await loadImage(canvas.toDataURL());

  paint.setPixelsFromImage((image as unknown) as HTMLImageElement);
  expect((paint.getColorAt(9, 9) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([0, 0, 255]);
  paint.undo();
  paint.redo();
  expect((paint.getColorAt(9, 9) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([0, 0, 255]);
});

it("Can paint fill empty canvas", () => {
  const paint = new UndoablePaintCanvas(2);
  paint.fillWithColor(0, 0, new RGBColor(255, 0, 0));
  paint.map(([x, y], color) => {
    expect((color as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  });
});

it("Can fill one side of canvas", () => {
  const paint = new UndoablePaintCanvas(3);
  paint.setColorAt(1, 0, new RGBColor(255, 0, 0));
  paint.setColorAt(1, 1, new RGBColor(255, 0, 0));
  paint.setColorAt(1, 2, new RGBColor(255, 0, 0));
  paint.fillWithColor(0, 0, new RGBColor(0, 255, 0));
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([0, 255, 0]);
  expect((paint.getColorAt(0, 1) as RGBColor).rgb).toStrictEqual([0, 255, 0]);
  expect((paint.getColorAt(0, 2) as RGBColor).rgb).toStrictEqual([0, 255, 0]);
  expect((paint.getColorAt(1, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(1, 1) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(1, 2) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect(paint.getColorAt(2, 0)).toStrictEqual(RGBColor.NO_COLOR);
  expect(paint.getColorAt(2, 1)).toStrictEqual(RGBColor.NO_COLOR);
  expect(paint.getColorAt(2, 2)).toStrictEqual(RGBColor.NO_COLOR);
});

it("Can fill around center", () => {
  const paint = new UndoablePaintCanvas(3);
  paint.fillWithColor(0, 0, new RGBColor(0, 255, 0));
  paint.setColorAt(1, 1, RGBColor.NO_COLOR);
  paint.fillWithColor(2, 1, new RGBColor(255, 255, 0));

  paint.map(([x, y], color) => {
    if (x === 1 && y === 1) {
      expect(paint.getColorAt(1, 1)).toStrictEqual(RGBColor.NO_COLOR);
    } else {
      expect((paint.getColorAt(x, y) as RGBColor).rgb).toStrictEqual([
        255,
        255,
        0,
      ]);
    }
  });
});

it("Can undo fill center", () => {
  const paint = new UndoablePaintCanvas(3);
  paint.fillWithColor(0, 0, new RGBColor(0, 255, 0));
  paint.undo();

  paint.map(([x, y], color) => {
    expect(paint.getColorAt(x, y)).toStrictEqual(RGBColor.NO_COLOR);
  });
});

it("Can redo fill center", () => {
  const paint = new UndoablePaintCanvas(3);
  paint.fillWithColor(0, 0, new RGBColor(0, 255, 0));
  paint.fillWithColor(0, 0, new RGBColor(0, 0, 0));
  paint.undo();
  paint.redo();

  paint.map(([x, y], color) => {
    expect((paint.getColorAt(x, y) as RGBColor).rgb).toStrictEqual([0, 0, 0]);
  });
});

it("Filling twice in the same spot doesn't add undo stacks", () => {
  const paint = new UndoablePaintCanvas(3);
  paint.fillWithColor(0, 0, new RGBColor(0, 255, 0));
  let startSize = paint.undoBuffer.getUndoSize();
  paint.fillWithColor(0, 0, new RGBColor(0, 255, 0));
  let endSize = paint.undoBuffer.getUndoSize();

  expect(endSize).toEqual(startSize);
});
