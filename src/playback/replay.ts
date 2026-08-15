import type { AlgorithmEvent } from "../core/events.js";

export interface ReplayFrame {
  values: readonly number[];
  compared: readonly number[];
  sorted: readonly number[];
  active: readonly number[];
  pivot: number | null;
}

export function replay(
  input: readonly number[],
  events: readonly AlgorithmEvent[],
  through = events.length,
): ReplayFrame {
  const values = [...input];
  let compared: number[] = [];
  const sorted = new Set<number>();
  const active = new Set<number>();
  let pivot: number | null = null;
  const limit = Math.max(0, Math.min(through, events.length));

  for (let index = 0; index < limit; index += 1) {
    const event = events[index];
    if (!event) continue;

    if (event.type === "compare") {
      compared = [...event.indices];
      continue;
    }

    if (event.type === "swap") {
      const [leftIndex, rightIndex] = event.indices;
      const left = values[leftIndex];
      const right = values[rightIndex];
      if (left === undefined || right === undefined) throw new Error("Replay encountered an invalid swap index.");
      values[leftIndex] = right;
      values[rightIndex] = left;
      continue;
    }

    if (event.type === "write") {
      if (event.index < 0 || event.index >= values.length) throw new Error("Replay encountered an invalid write index.");
      values[event.index] = event.value;
      continue;
    }

    if (event.state === "sorted") sorted.add(event.index);
    if (event.state === "active") active.add(event.index);
    if (event.state === "pivot") pivot = event.index;
  }

  return {
    values,
    compared,
    sorted: [...sorted],
    active: [...active],
    pivot,
  };
}
