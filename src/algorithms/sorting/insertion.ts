import type { AlgorithmEvent, AlgorithmRun } from "../../core/events.js";

export function insertionSort(input: readonly number[]): AlgorithmRun {
  const values = [...input];
  const events: AlgorithmEvent[] = [];

  for (let index = 1; index < values.length; index += 1) {
    let current = index;

    while (current > 0) {
      const previous = current - 1;
      events.push({ type: "compare", indices: [previous, current] });

      const left = values[previous];
      const right = values[current];
      if (left === undefined || right === undefined) {
        throw new Error("Insertion Sort encountered an invalid array index.");
      }

      if (left <= right) break;

      values[previous] = right;
      values[current] = left;
      events.push({ type: "swap", indices: [previous, current] });
      current = previous;
    }
  }

  for (let index = 0; index < values.length; index += 1) {
    events.push({ type: "mark", index, state: "sorted" });
  }

  return { input: [...input], events };
}
