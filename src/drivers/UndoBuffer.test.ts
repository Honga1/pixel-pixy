import { UndoBuffer } from "./UndoBuffer";

it("Can create", () => {
  expect(() => new UndoBuffer(0)).not.toThrow();
});

it("Can get size", () => {
  expect(new UndoBuffer(0).getUndoSize()).toEqual(0);
});

it("Can add one", () => {
  const undo = new UndoBuffer(0);

  undo.addCurrent(0);
  undo.addCurrent(0);
  expect(undo.getUndoSize()).toEqual(1);
});

it("Can get current", () => {
  const undo = new UndoBuffer(0);

  undo.addCurrent(0);
  undo.addCurrent(1);
  expect(undo.top()).toEqual(1);
});

it("Can take one", () => {
  const undo = new UndoBuffer(0);

  undo.addCurrent(0);
  undo.addCurrent(1);
  const returned = undo.undo();
  expect(undo.getUndoSize()).toEqual(0);
  expect(returned).toEqual(0);
});

it("Can retrieve in correct sequence", () => {
  const undo = new UndoBuffer(0);

  const inData = [1, 2, 3, 4, 5, 6];
  const expectedOutData = [5, 4, 3, 2, 1, 0];

  for (const data of inData) {
    undo.addCurrent(data);
  }

  expect(undo.getUndoSize()).toEqual(inData.length - 1);

  for (const data of expectedOutData) {
    const result = undo.undo();
    expect(result).toEqual(data);
  }

  expect(undo.getUndoSize()).toEqual(0);
});

it("Undoing too many returns undefined", () => {
  const undo = new UndoBuffer(0);

  undo.addCurrent(1);
  undo.addCurrent(2);
  expect(undo.getUndoSize()).toEqual(1);

  let result = undo.undo();
  expect(result).toEqual(1);
  result = undo.undo();
  expect(result).toEqual(0);

  expect(undo.getUndoSize()).toEqual(0);
});

it("Undoing then adding and undoing works", () => {
  const undo = new UndoBuffer(0);

  undo.addCurrent(1);
  undo.addCurrent(2);

  expect(undo.getUndoSize()).toEqual(1);

  expect(undo.undo()).toEqual(1);
  expect(undo.getUndoSize()).toEqual(0);
  expect(undo.undo()).toEqual(0);
  expect(undo.getUndoSize()).toEqual(0);
  undo.addCurrent(1);
  undo.addCurrent(2);
  undo.addCurrent(3);
  expect(undo.getUndoSize()).toEqual(2);
  expect(undo.undo()).toEqual(2);
  expect(undo.undo()).toEqual(1);
  expect(undo.undo()).toEqual(0);
});

it("Can clear", () => {
  const undo = new UndoBuffer(0);

  undo.addCurrent(1);
  undo.addCurrent(2);
  expect(undo.getUndoSize()).toEqual(1);
  undo.clear();
  expect(undo.getUndoSize()).toEqual(0);
});

it("Trims once max length is reached", () => {
  const maxSize = 2;
  const undo = new UndoBuffer(0, maxSize);

  undo.addCurrent(1);
  undo.addCurrent(1);
  expect(undo.getUndoSize()).toEqual(1);
  undo.addCurrent(1);
  expect(undo.getUndoSize()).toEqual(2);
  undo.addCurrent(1);
  expect(undo.getUndoSize()).toEqual(2);

  undo.clear();
  expect(undo.getUndoSize()).toEqual(0);

  const inData = [1, 2, 3, 4, 5, 6];
  const expectedOutData = [5, 4];

  for (const data of inData) {
    undo.addCurrent(data);
  }

  expect(undo.getUndoSize()).toEqual(2);

  for (const data of expectedOutData) {
    const result = undo.undo();
    expect(result).toEqual(data);
  }
});
