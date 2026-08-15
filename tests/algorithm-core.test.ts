import { describe, expect, it } from "vitest";
import { bubbleSort } from "../src/algorithms/sorting/bubble.js";
import { metricsFor } from "../src/core/events.js";
import { replay } from "../src/playback/replay.js";

describe("Bubble Sort event stream", () => {
  it("replays to the same sorted output as a numeric reference sort", () => {
    const input = [8, 3, 6, 1, 7, 2, 5, 4];
    const run = bubbleSort(input);
    const result = replay(run.input, run.events);

    expect(result.values).toEqual([...input].sort((a, b) => a - b));
    expect(input).toEqual([8, 3, 6, 1, 7, 2, 5, 4]);
  });

  it("is deterministic for the same input", () => {
    const input = [5, 1, 4, 2, 8];
    expect(bubbleSort(input).events).toEqual(bubbleSort(input).events);
  });

  it("derives metrics from the same event stream used for replay", () => {
    const run = bubbleSort([3, 2, 1]);
    const metrics = metricsFor(run.events);
    expect(metrics.comparisons).toBe(3);
    expect(metrics.swaps).toBe(3);
    expect(metrics.writes).toBe(0);
  });

  it("can replay an intermediate frame without mutating the recorded input", () => {
    const run = bubbleSort([4, 1, 3, 2]);
    const halfway = replay(run.input, run.events, Math.floor(run.events.length / 2));
    expect(halfway.values).toHaveLength(4);
    expect(run.input).toEqual([4, 1, 3, 2]);
  });
});
