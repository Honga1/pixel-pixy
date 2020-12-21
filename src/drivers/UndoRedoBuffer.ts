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
