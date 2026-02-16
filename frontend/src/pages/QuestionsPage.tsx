import { useEffect, useState } from "react";
import { api } from "../services/api";
import QuestionCard from "../components/QuestionCard";
import type { Question } from "../types/question.types";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await api.get("/questions");
      setQuestions(res.data.data);
    };

    fetchQuestions();
  }, []);

  const handleSelect = (questionId: number, value: string, type: string) => {
    setAnswers((prev) => {
      const existing = prev[questionId] || [];

      if (type === "single-select") {
        return { ...prev, [questionId]: [value] };
      }

      if (existing.includes(value)) {
        return {
          ...prev,
          [questionId]: existing.filter((v) => v !== value),
        };
      }

      return {
        ...prev,
        [questionId]: [...existing, value],
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Questions App</h1>

      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          selectedValues={answers[q.id] || []}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default QuestionsPage;
