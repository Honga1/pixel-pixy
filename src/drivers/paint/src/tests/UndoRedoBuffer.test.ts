import { UndoRedoBuffer } from "../UndoRedoBuffer";
it("Can create", () => {
  expect(() => new UndoRedoBuffer(0)).not.toThrow();
});

it("Can undo one", () => {
  const undoRedo = new UndoRedoBuffer(0);

  undoRedo.addCurrent(1);
  undoRedo.addCurrent(1);
  expect(undoRedo.getUndoSize()).toEqual(1);
  expect(undoRedo.getRedoSize()).toEqual(0);
  const result = undoRedo.undo();
  expect(result).toEqual(1);
  expect(undoRedo.getUndoSize()).toEqual(0);
  expect(undoRedo.getRedoSize()).toEqual(1);
});

it("Can undo two", () => {
  const undoRedo = new UndoRedoBuffer(0);

  undoRedo.addCurrent(1);
  undoRedo.addCurrent(2);
  undoRedo.addCurrent(3);
  expect(undoRedo.getUndoSize()).toEqual(2);
  expect(undoRedo.getRedoSize()).toEqual(0);
  undoRedo.undo();
  const result = undoRedo.undo();
  expect(result).toEqual(1);
  expect(undoRedo.getUndoSize()).toEqual(0);
  expect(undoRedo.getRedoSize()).toEqual(2);
});

it("Can redo one", () => {
  const undoRedo = new UndoRedoBuffer(0);

  undoRedo.addCurrent(1);
  undoRedo.addCurrent(2);
  const result = undoRedo.undo();
  expect(result).toEqual(1);
  const redoResult = undoRedo.redoOne();
  expect(redoResult).toEqual(2);
  expect(undoRedo.getUndoSize()).toEqual(1);
  expect(undoRedo.getRedoSize()).toEqual(0);
});

it("Can redo two", () => {
  const undoRedo = new UndoRedoBuffer(0);

  undoRedo.addCurrent(1);
  undoRedo.addCurrent(2);
  const result = undoRedo.undo();
  expect(result).toEqual(1);
  expect(undoRedo.undo()).toEqual(0);
  expect(undoRedo.getRedoSize()).toEqual(2);
  const redoResult = undoRedo.redoOne();
  expect(undoRedo.getRedoSize()).toEqual(1);
  expect(undoRedo.getUndoSize()).toEqual(0);
  expect(redoResult).toEqual(1);
});

it("Adding one clear redos", () => {
  const undoRedo = new UndoRedoBuffer(0);

  undoRedo.addCurrent(1);
  const result = undoRedo.undo();
  expect(result).toEqual(0);
  expect(undoRedo.getRedoSize()).toEqual(1);
  undoRedo.addCurrent(1);
  expect(undoRedo.getRedoSize()).toEqual(0);
});
