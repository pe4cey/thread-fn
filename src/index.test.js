import { thread, threadFirst, threadLast, T } from "./index";

const flatten = arr =>
  arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

test("-> works", () => {
  expect(thread("->", "3", parseInt, a => a + a)).toBe(6);
  expect(threadFirst("3", parseInt, a => a + a)).toBe(6);
  expect(T["->"]("3", parseInt, a => a + a)).toBe(6);
});
test("->> works", () => {
  expect(thread("->>", 6, [(a, b) => a + b, 10])).toBe(16);
  expect(threadLast(6, [(a, b) => a + b, 10])).toBe(16);
  expect(T["->>"](6, [(a, b) => a + b, 10])).toBe(16);
});

test("map all the things", () => {
  const map1 = thread(
    "->",
    { a: "b" },
    _ => ({ ..._, b: "c" }),
    _ => {
      _["d"] = { foo: "bar" };
      return _;
    },
    Object.entries,
    flatten
  );

  const map2 = thread("->>", "3", parseInt, [(a, b) => a + b, 3]);

  expect(map2).toBe(6);
  expect(map1).toEqual(["a", "b", "b", "c", "d", { foo: "bar" }]);
});

const out = (a, b) => `${a} then ${b}`;

test("example 1", () => {
  const arg = "3";
  const result = thread("->", arg, parseInt, _ => _ - 1, [out, 1]);
  expect(result).toBe(`2 then 1`);
});
test("example 2", () => {
  const arg = "3";
  const result = thread("->>", arg, parseInt, _ => _ - 1, [out, 1]);
  expect(result).toBe(`1 then 2`);
});
