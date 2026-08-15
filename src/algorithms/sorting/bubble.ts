import type { AlgorithmEvent, AlgorithmRun } from "../../core/events.js";

export function bubbleSort(input: readonly number[]): AlgorithmRun {
  const values = [...input];
  const events: AlgorithmEvent[] = [];

  for (let end = values.length - 1; end > 0; end -= 1) {
    let swapped = false;

    for (let index = 0; index < end; index += 1) {
      const next = index + 1;
      events.push({ type: "compare", indices: [index, next] });

      const left = values[index];
      const right = values[next];
      if (left === undefined || right === undefined) {
        throw new Error("Bubble Sort encountered an invalid array index.");
      }

      if (left > right) {
        values[index] = right;
        values[next] = left;
        events.push({ type: "swap", indices: [index, next] });
        swapped = true;
      }
    }

    events.push({ type: "mark", index: end, state: "sorted" });
    if (!swapped) break;
  }

  if (values.length) events.push({ type: "mark", index: 0, state: "sorted" });

  return { input: [...input], events };
}
