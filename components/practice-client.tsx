"use client";

import { useState } from "react";

type PracticeClientProps = {
  examId: string;
  title: string;
  questions: Array<{
    _id: string;
    prompt: string;
    type: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
};

export function PracticeClient({
  examId,
  title,
  questions
}: PracticeClientProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { score: number }>(null);
  const [message, setMessage] = useState("");

  const correct = questions.filter(
    (question) => answers[question._id] === question.answer
  ).length;
  const score = Math.round((correct / questions.length) * 100);

  async function submit() {
    const payload = {
      examId,
      score,
      answers: questions.map((question) => ({
        questionId: question._id,
        answer: answers[question._id] || "",
        correct: answers[question._id] === question.answer
      }))
    };

    const response = await fetch("/api/practice/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { score?: number; error?: string };

    if (!response.ok) {
      setMessage(data.error || "Please log in to save your score.");
      return;
    }

    setResult({ score: data.score || score });
    setMessage("Your practice result was saved.");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
          Practice Mode
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 text-slate-300">
          Answer the questions and save your score when you are done.
        </p>
      </div>

      {questions.map((question, index) => (
        <section
          key={question._id}
          className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8"
        >
          <p className="text-sm text-amber-200">Question {index + 1}</p>
          <h2 className="mt-2 text-xl font-medium text-white">{question.prompt}</h2>

          <div className="mt-5 space-y-3">
            {question.type === "multiple-choice" ? (
              question.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-slate-200 transition hover:border-amber-300/40"
                >
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [question._id]: event.target.value
                      }))
                    }
                  />
                  {option}
                </label>
              ))
            ) : (
              <textarea
                rows={4}
                value={answers[question._id] || ""}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [question._id]: event.target.value
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-300"
                placeholder="Write your answer here"
              />
            )}
          </div>
        </section>
      ))}

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <button
          onClick={submit}
          className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Save result
        </button>
        {result ? (
          <p className="mt-4 text-lg font-medium text-emerald-200">
            Score: {result.score}%
          </p>
        ) : null}
        {message ? <p className="mt-3 text-sm text-slate-300">{message}</p> : null}
      </div>
    </div>
  );
}
