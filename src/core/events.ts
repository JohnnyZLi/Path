export type AlgorithmEvent =
  | { type: "compare"; indices: readonly [number, number] }
  | { type: "swap"; indices: readonly [number, number] }
  | { type: "write"; index: number; value: number }
  | { type: "mark"; index: number; state: "sorted" | "pivot" | "active" };

export interface AlgorithmRun {
  input: readonly number[];
  events: readonly AlgorithmEvent[];
}

export interface PlaybackMetrics {
  comparisons: number;
  swaps: number;
  writes: number;
}

export function metricsFor(events: readonly AlgorithmEvent[]): PlaybackMetrics {
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;

  for (const event of events) {
    if (event.type === "compare") comparisons += 1;
    if (event.type === "swap") swaps += 1;
    if (event.type === "write") writes += 1;
  }

  return { comparisons, swaps, writes };
}
