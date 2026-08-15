import { describe, expect, it } from "vitest";
import { insertionSort } from "../src/algorithms/sorting/insertion.js";
import { replay } from "../src/playback/replay.js";

const cases: ReadonlyArray<readonly [string, readonly number[]]> = [
  ["empty", []],
  ["single-value", [7]],
  ["already-sorted", [1, 2, 3, 4, 5]],
  ["reverse-sorted", [5, 4, 3, 2, 1]],
  ["duplicate-value", [3, 1, 3, 2, 1]],
  ["mixed", [8, -2, 5, 0, 3, -2]],
];

describe("Insertion Sort event stream", () => {
  it.each(cases)("replays %s input to the numeric reference sort", (_name, input) => {
    const before = [...input];
    const run = insertionSort(input);
    const result = replay(run.input, run.events);

    expect(result.values).toEqual([...input].sort((a, b) => a - b));
    expect(input).toEqual(before);
    expect(run.input).toEqual(before);
    expect(run.input).not.toBe(input);
  });

  it("is deterministic for the same input", () => {
    const input = [4, 2, 5, 1, 3];
    expect(insertionSort(input).events).toEqual(insertionSort(input).events);
  });

  it("emits only replayable semantic events and marks every final position sorted", () => {
    const run = insertionSort([3, 1, 2]);
    const result = replay(run.input, run.events);

    expect(run.events.every((event) => ["compare", "swap", "write", "mark"].includes(event.type))).toBe(true);
    expect(result.sorted).toEqual([0, 1, 2]);
  });
});
