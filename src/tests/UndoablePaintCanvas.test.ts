import { createCanvas, loadImage } from "canvas";
import { RGBColor } from "../drivers/Color";
import { UndoablePaintCanvas } from "../drivers/UndoablePaintCanvas";
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
