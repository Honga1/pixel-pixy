export class KeyPairMap<KeyA, KeyB, Value> implements Map<[KeyA, KeyB], Value> {
  private map = new Map<KeyA, Map<KeyB, Value>>();

  clear(): void {
    this.map.clear();
  }

  delete([keyA, keyB]: [KeyA, KeyB]): boolean {
    return this.map.get(keyA)?.delete(keyB) || false;
  }

  forEach(
    callbackfn: (
      value: Value,
      key: [KeyA, KeyB],
      map: Map<[KeyA, KeyB], Value>
    ) => void,
    thisArg?: any
  ): void {
    const refMap = this.refMap();

    refMap.forEach(callbackfn, thisArg);
  }

  private refMap() {
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
    return this.refMap().size;
  }

  [Symbol.iterator](): IterableIterator<[[KeyA, KeyB], Value]> {
    return this.refMap()[Symbol.iterator]();
  }

  entries(): IterableIterator<[[KeyA, KeyB], Value]> {
    return this.refMap().entries();
  }

  keys(): IterableIterator<[KeyA, KeyB]> {
    return this.refMap().keys();
  }

  values(): IterableIterator<Value> {
    return this.refMap().values();
  }

  [Symbol.toStringTag]: string;
}
