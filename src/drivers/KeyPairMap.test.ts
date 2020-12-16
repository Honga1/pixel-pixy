import { KeyPairMap } from "./KeyPairMap";
it("Map can create", () => {
  expect(() => new KeyPairMap()).not.toThrow();
});

it("Map should be empty", () => {
  const map = new KeyPairMap<number, number, string>();
  expect(map.size).toEqual(0);
});

it("Map can add key", () => {
  const map = new KeyPairMap<number, number, string>();
  const key = [0, 0] as [number, number];
  const value = "red";

  expect(map.size).toEqual(0);
  map.set(key, value);
  expect(map.size).toEqual(1);
  expect(map.get(key)).toEqual(value);
  expect(map.has(key)).toBeTruthy();
});

it("Map can remove key", () => {
  const map = new KeyPairMap<number, number, string>();
  const key = [0, 0] as [number, number];
  const value = "red";

  expect(map.size).toEqual(0);
  map.set(key, value);
  expect(map.size).toEqual(1);
  expect(map.get(key)).toEqual(value);
  map.delete(key);
  expect(map.size).toEqual(0);
  expect(map.get(key)).toEqual(undefined);
  expect(map.has(key)).toBeFalsy();
});

it("Map can forEach key", () => {
  const map = new KeyPairMap<number, number, string>();
  const keyA = [0, 0] as [number, number];
  const keyB = [0, 1] as [number, number];
  const keyC = [1, 1] as [number, number];
  const valueA = "red";
  const valueB = "blue";
  const valueC = "green";

  expect(map.size).toEqual(0);
  map.set(keyA, valueA);
  map.set(keyB, valueB);
  map.set(keyC, valueC);
  expect(map.size).toEqual(3);

  map.forEach((value, [key1, key2]) => {
    if (key1 === 0 && key2 === 0) {
      expect(value).toEqual(valueA);
    }
    if (key1 === 0 && key2 === 1) {
      expect(value).toEqual(valueB);
    }
    if (key1 === 1 && key2 === 1) {
      expect(value).toEqual(valueC);
    }
  });
});

it("Map can get entries", () => {
  const map = new KeyPairMap<number, number, string>();
  const keyA = [0, 0] as [number, number];
  const keyB = [0, 1] as [number, number];
  const keyC = [1, 1] as [number, number];
  const valueA = "red";
  const valueB = "blue";
  const valueC = "green";

  expect(map.size).toEqual(0);
  map.set(keyA, valueA);
  map.set(keyB, valueB);
  map.set(keyC, valueC);
  expect(map.size).toEqual(3);

  let entries = map.entries();

  expect(entries.next()).toStrictEqual({
    done: false,
    value: [[0, 0], "red"],
  });
  expect(entries.next()).toStrictEqual({
    done: false,
    value: [[0, 1], "blue"],
  });
  expect(entries.next()).toStrictEqual({
    done: false,
    value: [[1, 1], "green"],
  });
});

it("Map can get keys", () => {
  const map = new KeyPairMap<number, number, string>();
  const keyA = [0, 0] as [number, number];
  const keyB = [0, 1] as [number, number];
  const keyC = [1, 1] as [number, number];
  const valueA = "red";
  const valueB = "blue";
  const valueC = "green";

  expect(map.size).toEqual(0);
  map.set(keyA, valueA);
  map.set(keyB, valueB);
  map.set(keyC, valueC);
  expect(map.size).toEqual(3);

  let keys = map.keys();

  expect(keys.next()).toStrictEqual({
    done: false,
    value: [0, 0],
  });
  expect(keys.next()).toStrictEqual({
    done: false,
    value: [0, 1],
  });
  expect(keys.next()).toStrictEqual({
    done: false,
    value: [1, 1],
  });
});

it("Map can get values", () => {
  const map = new KeyPairMap<number, number, string>();
  const keyA = [0, 0] as [number, number];
  const keyB = [0, 1] as [number, number];
  const keyC = [1, 1] as [number, number];
  const valueA = "red";
  const valueB = "blue";
  const valueC = "green";

  expect(map.size).toEqual(0);
  map.set(keyA, valueA);
  map.set(keyB, valueB);
  map.set(keyC, valueC);
  expect(map.size).toEqual(3);

  let values = map.values();

  expect(values.next()).toStrictEqual({
    done: false,
    value: "red",
  });
  expect(values.next()).toStrictEqual({
    done: false,
    value: "blue",
  });
  expect(values.next()).toStrictEqual({
    done: false,
    value: "green",
  });
});

it("Map can clear", () => {
  const map = new KeyPairMap<number, number, string>();
  const keyA = [0, 0] as [number, number];
  const keyB = [0, 1] as [number, number];
  const keyC = [1, 1] as [number, number];
  const valueA = "red";
  const valueB = "blue";
  const valueC = "green";

  expect(map.size).toEqual(0);
  map.set(keyA, valueA);
  map.set(keyB, valueB);
  map.set(keyC, valueC);
  expect(map.size).toEqual(3);

  map.clear();
  expect(map.size).toEqual(0);
});

it("Map can clone", () => {
  const map = new KeyPairMap<number, number, string>();
  const keyA = [0, 0] as [number, number];
  const keyB = [0, 1] as [number, number];
  const keyC = [1, 1] as [number, number];
  const valueA = "red";
  const valueB = "blue";
  const valueC = "green";

  expect(map.size).toEqual(0);
  map.set(keyA, valueA);
  map.set(keyB, valueB);
  map.set(keyC, valueC);
  expect(map.size).toEqual(3);

  const clone = map.clone();

  expect(clone === map).toBeFalsy();
  expect(clone).toStrictEqual(map);
});
