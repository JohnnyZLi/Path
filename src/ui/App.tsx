import { useEffect, useMemo, useState } from "react";
import { bubbleSort } from "../algorithms/sorting/bubble.js";
import { metricsFor } from "../core/events.js";
import { replay } from "../playback/replay.js";

const INITIAL_VALUES = [42, 18, 73, 31, 58, 9, 66, 25, 51, 14, 81, 36];

export function App() {
  const [input, setInput] = useState<number[]>(INITIAL_VALUES);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const run = useMemo(() => bubbleSort(input), [input]);
  const frame = useMemo(() => replay(run.input, run.events, step), [run, step]);
  const metrics = useMemo(() => metricsFor(run.events.slice(0, step)), [run, step]);
  const max = Math.max(...frame.values, 1);
  const compared = new Set(frame.compared);
  const sorted = new Set(frame.sorted);

  useEffect(() => {
    if (!playing) return;
    if (step >= run.events.length) {
      setPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStep((current) => Math.min(current + 1, run.events.length));
    }, 90);

    return () => window.clearTimeout(timer);
  }, [playing, step, run.events.length]);

  const reset = () => {
    setPlaying(false);
    setStep(0);
  };

  const shuffle = () => {
    const values = Array.from({ length: 12 }, () => 8 + Math.floor(Math.random() * 76));
    setInput(values);
    setStep(0);
    setPlaying(false);
  };

  return (
    <main className="shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">PATH / ALGORITHM PLAYGROUND</p>
          <h1>Watch the decisions, not just the result.</h1>
        </div>
        <div className="algorithm-chip">
          <span>ACTIVE ALGORITHM</span>
          <strong>Bubble Sort</strong>
        </div>
      </header>

      <section className="stage" aria-label="Bubble Sort visualization">
        <div className="stage-grid" aria-hidden="true" />
        <div className="bars">
          {frame.values.map((value, index) => {
            const state = sorted.has(index) ? "sorted" : compared.has(index) ? "compared" : "idle";
            return (
              <div className="bar-slot" key={`${index}-${value}`}>
                <div
                  className={`bar bar--${state}`}
                  style={{ height: `${Math.max(8, (value / max) * 100)}%` }}
                >
                  <span>{value}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="progress-track" aria-label={`Step ${step} of ${run.events.length}`}>
          <div
            className="progress-fill"
            style={{ width: `${run.events.length ? (step / run.events.length) * 100 : 0}%` }}
          />
        </div>
      </section>

      <section className="control-deck">
        <div className="transport" aria-label="Playback controls">
          <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
            − Step
          </button>
          <button className="primary" type="button" onClick={() => setPlaying((value) => !value)}>
            {playing ? "Pause" : step >= run.events.length ? "Replay" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => setStep((value) => Math.min(run.events.length, value + 1))}
            disabled={step >= run.events.length}
          >
            + Step
          </button>
          <button type="button" onClick={reset}>Reset</button>
          <button type="button" onClick={shuffle}>New data</button>
        </div>

        <dl className="metrics">
          <div><dt>Step</dt><dd>{step}<span>/{run.events.length}</span></dd></div>
          <div><dt>Comparisons</dt><dd>{metrics.comparisons}</dd></div>
          <div><dt>Swaps</dt><dd>{metrics.swaps}</dd></div>
          <div><dt>Writes</dt><dd>{metrics.writes}</dd></div>
        </dl>
      </section>
    </main>
  );
}
