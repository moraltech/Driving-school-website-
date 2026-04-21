"use client";

import { useState } from "react";

export function QuizCard() {
  const [answer, setAnswer] = useState<number | null>(null);
  const [result, setResult] = useState("");

  const question = {
    prompt: "At a four-way stop, who has right-of-way?",
    options: ["Driver turning left", "Driver arriving first", "Driver in largest vehicle", "Driver on main road"],
    correct: 1
  };

  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Practice Quiz</h3>
      <p className="mt-2 text-sm">{question.prompt}</p>
      <div className="mt-3 grid gap-2">
        {question.options.map((option, index) => (
          <button key={option} onClick={() => setAnswer(index)} className={`rounded border px-3 py-2 text-left ${answer === index ? "border-brand-blue bg-blue-50" : ""}`}>
            {option}
          </button>
        ))}
      </div>
      <button className="mt-3 rounded bg-brand-blue px-3 py-2 text-white" onClick={() => {
        if (answer === null) return;
        setResult(answer === question.correct ? "Correct!" : "Not quite. Review right-of-way rules.");
      }}>
        Submit
      </button>
      {result ? <p className="mt-2 text-sm">{result}</p> : null}
    </section>
  );
}
