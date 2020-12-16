import { UndoBuffer } from "./UndoBuffer";

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
