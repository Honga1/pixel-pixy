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
