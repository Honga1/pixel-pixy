
export class KeyPairMap<KeyA, KeyB, Value> implements Map<[KeyA, KeyB], Value> {
  constructor(keyPairMap?: KeyPairMap<KeyA, KeyB, Value>) {
    if (!keyPairMap)
      return;

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
