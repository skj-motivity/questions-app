import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Question } from "../types/question.types";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import SubmitButton from "../components/SubmitButton";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/questions")
      .then((res) => {
        const raw = res.data?.data ?? res.data ?? [];
        const items = Array.isArray(raw) ? raw : [];
        const mapped: Question[] = items.map((it: any) => {
          const source = it.attributes ?? it;
          return {
            id: it.id,
            documentId: source.documentId ?? source.document_id ?? undefined,
            question: source.question ?? "",
            type: source.type ?? null,
            createdAt: source.createdAt ?? source.created_at ?? undefined,
            updatedAt: source.updatedAt ?? source.updated_at ?? undefined,
            publishedAt: source.publishedAt ?? source.published_at ?? undefined,
            free_text: source.free_text ?? null,
            options: source.options ?? [],
          };
        });
        setQuestions(mapped);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAnswer = (
    questionId: number,
    value: string,
    type: string | null,
  ) => {
    setAnswers((prev) => {
      const prevVal = prev[questionId];
      if (type === "multi-select" || type === "multi-with-text") {
        const arr = Array.isArray(prevVal) ? [...(prevVal as string[])] : [];
        const idx = arr.indexOf(value);
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(value);
        return { ...prev, [questionId]: arr };
      }
      return { ...prev, [questionId]: value };
    });
  };

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Form submitted successfully!");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 h-screen flex flex-col">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold mb-4">Questions Form</h1>
        <ProgressBar answered={answeredQuestions} total={totalQuestions} />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mt-4 mb-4">
        {questions.length === 0 ? (
          <p className="text-center text-gray-500">No questions available.</p>
        ) : (
          questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              selectedAnswer={answers[q.id]}
              onAnswer={handleAnswer}
            />
          ))
        )}
      </div>

      <div className="shrink-0">
        <SubmitButton
          disabled={answeredQuestions !== totalQuestions}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default QuestionsPage;
