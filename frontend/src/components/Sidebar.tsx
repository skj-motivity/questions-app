import React from "react";
import type { Question } from "../types/question.types";

type Props = {
  questions: Question[];
  answeredMap: Record<number, string | string[]>;
  onJumpTo: (questionId: number) => void;
  current?: number | null;
};

const ScoreCard: React.FC<{ answered: number; total: number }> = ({
  answered,
  total,
}) => {
  const pct = total === 0 ? 0 : Math.round((answered / total) * 100);
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="text-2xl font-bold">{pct}%</div>
      <div className="text-sm text-gray-500 mt-1">
        You answered {answered} / {total}
      </div>
    </div>
  );
};

const Sidebar: React.FC<Props> = ({
  questions,
  answeredMap,
  onJumpTo,
  current,
}) => {
  return (
    <aside className="lg:sticky lg:top-6 space-y-4">
      <ScoreCard
        answered={Object.keys(answeredMap).length}
        total={questions.length}
      />

      <div className="bg-white rounded-xl shadow p-4">
        <div className="text-sm font-medium mb-3">Questions</div>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((q, idx) => {
            const isAnswered = answeredMap[q.id] !== undefined;
            const isActive = current === q.id;
            return (
              <button
                key={q.id}
                onClick={() => onJumpTo(q.id)}
                aria-label={`Question ${idx + 1}`}
                className={`w-full h-10 flex items-center justify-center rounded-md text-sm font-medium transition
                  ${isActive ? "ring-2 ring-blue-500 bg-white" : ""}
                  ${isAnswered ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden lg:block text-xs text-gray-500">
        Tip: Click a number to jump to that question
      </div>
    </aside>
  );
};

export default Sidebar;
