import { createCanvas, loadImage } from "canvas";
import { PaintCanvas } from "../drivers/PaintCanvas";
import { RGBColor } from "../drivers/RGBColor";

it("Paint can create", () => {
  expect(() => new PaintCanvas(5)).not.toThrow();
});

it("Can get pixel map", () => {
  expect(new PaintCanvas(5).getPixelMap().size).toEqual(5 ** 2);
});

it("Can't set pixel map with wrong sizes", () => {
  const paintBase = new PaintCanvas(5);
  const paintIncoming = new PaintCanvas(4);

  expect(() => paintBase.setPixelMap(paintIncoming.getPixelMap())).toThrow();
});
it("Can set pixel map", () => {
  const paintBase = new PaintCanvas(5);
  const paintIncoming = new PaintCanvas(5);

  paintBase.setPixelMap(paintIncoming.getPixelMap());

  expect(paintBase.getPixelMap()).toEqual(paintIncoming.getPixelMap());
});

it("Paint is correct dimensions", () => {
  expect(new PaintCanvas(5).dimension()).toEqual(5);
});

it("Paint is empty", () => {
  expect(new PaintCanvas(1).getColorAt(0, 0)).toEqual(RGBColor.NO_COLOR);
});

it("Can't get pixels out of range", () => {
  expect(() => new PaintCanvas(1).getColorAt(1, 1)).toThrow();
});

it("Can't set pixels out of range", () => {
  expect(() =>
    new PaintCanvas(1).setColorAt(1, 1, RGBColor.NO_COLOR)
  ).toThrow();
});

it("Can set color", () => {
  const paint = new PaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 255, 255));
  const maybeColor = paint.getColorAt(0, 0);
  expect(maybeColor instanceof RGBColor).toBeTruthy();
  expect((maybeColor as RGBColor).rgb).toStrictEqual([255, 255, 255]);
});

it("Can clear", () => {
  const paint = new PaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 255, 255));
  const maybeColor = paint.getColorAt(0, 0);
  expect(maybeColor instanceof RGBColor).toBeTruthy();
  expect((maybeColor as RGBColor).rgb).toStrictEqual([255, 255, 255]);
  paint.clear();
  expect(paint.getColorAt(0, 0)).toEqual(RGBColor.NO_COLOR);
});

it("Can mutableMap", () => {
  const paint = new PaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 255, 255));
  const maybeColor = paint.getColorAt(0, 0);
  expect(maybeColor instanceof RGBColor).toBeTruthy();
  expect((maybeColor as RGBColor).rgb).toStrictEqual([255, 255, 255]);
  paint.mutableMap(() => new RGBColor(0, 0, 0));
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toEqual([0, 0, 0]);
});

it("Can write to HTMLCanvasElement", () => {
  const paint = new PaintCanvas(1);
  paint.setColorAt(0, 0, new RGBColor(255, 0, 0));

  const htmlCanvas = createCanvas(1, 1);
  PaintCanvas.DrawToCanvas(paint, (htmlCanvas as unknown) as HTMLCanvasElement);

  const context = htmlCanvas.getContext("2d");
  const imageData = context.getImageData(0, 0, 1, 1);

  expect(new Array(...imageData.data)).toStrictEqual([255, 0, 0, 255]);
});

it("Can set canvas", () => {
  const paint = new PaintCanvas(1);
  paint.setCanvas((createCanvas(1, 1) as unknown) as HTMLCanvasElement);
  expect(paint.getCanvas()).toBeTruthy();
});

it("Can't set canvas with invalid sizes", () => {
  const paint = new PaintCanvas(1);
  expect(() =>
    paint.setCanvas((createCanvas(2, 2) as unknown) as HTMLCanvasElement)
  ).toThrow();
  expect(() =>
    paint.setCanvas((createCanvas(1, 2) as unknown) as HTMLCanvasElement)
  ).toThrow();
  expect(() =>
    paint.setCanvas((createCanvas(1, 1) as unknown) as HTMLCanvasElement)
  ).not.toThrow();
});

it("Can't draw to canvas that doesn't exist", () => {
  const paint = new PaintCanvas(1);
  expect(() => paint.drawToCanvas()).toThrow();
});

it("Can  draw to own canvas", () => {
  const paint = new PaintCanvas(1);
  const htmlCanvas = createCanvas(1, 1);
  paint.setCanvas((htmlCanvas as unknown) as HTMLCanvasElement);
  paint.setColorAt(0, 0, new RGBColor(255, 0, 0));
  paint.drawToCanvas();

  const context = htmlCanvas.getContext("2d");
  const imageData = context.getImageData(0, 0, 1, 1);

  expect(new Array(...imageData.data)).toStrictEqual([255, 0, 0, 255]);
});

it("Can handle touch event", () => {
  const getBoundingClientRect: () => DOMRect = () => {
    return ({
      bottom: 100,
      top: 0,
      height: 100,
      left: 0,
      right: 100,
      width: 100,
    } as unknown) as DOMRect;
  };
  const htmlCanvas = {
    ...createCanvas(10, 10),
    clientWidth: 100,
    clientHeight: 100,
    getBoundingClientRect,
  };
  const paint = new PaintCanvas(10);

  let touch = {
    target: htmlCanvas,
    changedTouches: [{ clientX: 0, clientY: 0, target: htmlCanvas }],
  };

  paint.touchEvent(
    (touch as unknown) as React.TouchEvent<HTMLElement>,
    new RGBColor(255, 0, 0)
  );

  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([255, 0, 0]);

  touch = {
    target: htmlCanvas,
    changedTouches: [{ clientX: 100, clientY: 0, target: htmlCanvas }],
  };

  paint.touchEvent(
    (touch as unknown) as React.TouchEvent<HTMLElement>,
    new RGBColor(0, 255, 0)
  );

  expect((paint.getColorAt(9, 0) as RGBColor).rgb).toStrictEqual([0, 255, 0]);
});

it("Can load from canvas", async () => {
  const paint = new PaintCanvas(10);

  const canvas = createCanvas(100, 100);
  const context = canvas.getContext("2d");
  context.fillStyle = "red";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

  paint.setPixelsFromCanvas((canvas as unknown) as HTMLCanvasElement);
  expect((paint.getColorAt(9, 9) as RGBColor).rgb).toStrictEqual([255, 0, 0]);
  expect((paint.getColorAt(0, 0) as RGBColor).rgb).toStrictEqual([0, 0, 255]);
});

it("Can load from image", async () => {
  const paint = new PaintCanvas(10);

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
