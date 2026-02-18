import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { api } from "../services/api";
import type { Question, QuestionsApiResponse } from "../types/question.types";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import SubmitButton from "../components/SubmitButton";
import Header from "../components/Header";
import { getLocale, setLocale, type Locale } from "../services/locale";
import { t } from "../services/translation";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(true);
  const [locale, setLocaleState] = useState<Locale>(() => getLocale());
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuestions = useCallback(async (loc: string) => {
    setLoading(true);
    try {
      const res = await api.get<QuestionsApiResponse>("/questions", {
        params: { locale: loc },
      });

      const items = res.data?.data ?? [];

      const mapped: Question[] = items.map((q) => ({
        id: q.id,
        q_id: q.q_id,
        question: q.question ?? "",
        type: q.type ?? null,
        options: q.options ?? [],
        documentId: q.documentId,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt,
        publishedAt: q.publishedAt,
      }));

      mapped.sort((a, b) => Number(a.q_id) - Number(b.q_id));

      setQuestions(mapped);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions(locale);
  }, [locale, fetchQuestions]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (
    question: Question,
    value: string,
    type: string | null,
  ) => {
    const key = String(question.q_id ?? question.id);

    setAnswers((prev) => {
      const prevVal = prev[key];

      if (type === "multi-select" || type === "multi-with-text") {
        const arr = Array.isArray(prevVal) ? [...prevVal] : [];
        const idx = arr.indexOf(value);
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(value);
        return { ...prev, [key]: arr };
      }

      return { ...prev, [key]: value };
    });
  };

  const answeredCount = Object.keys(answers).length;
  const total = questions.length;
  const percentage =
    total === 0 ? 0 : Math.round((answeredCount / total) * 100);

  const handleLocaleChange = (l: Locale) => {
    setLocale(l);
    setLocaleState(l);
    setAnswers({});
    // Answers are preserved because we use q_id
  };

  if (loading || !currentQuestion) {
    return <p className="text-center mt-10">{t(locale, "loading")}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <Header locale={locale} onLocaleChange={handleLocaleChange} />

      <main className="max-w-7xl mx-auto px-6 py-8 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <section className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div>
              <h1 className="text-2xl font-bold">{t(locale, "appTitle")}</h1>{" "}
              <p className="text-sm text-gray-500">
                {t(locale, "question")} {currentIndex + 1} / {total}
              </p>
            </div>
            <div className="w-1/3">
              <ProgressBar answered={answeredCount} total={total} />
            </div>
          </div>

          {/* Question Card */}
          <div
            key={currentQuestion.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300"
          >
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={
                answers[String(currentQuestion.q_id ?? currentQuestion.id)]
              }
              onAnswer={(_id, value, type) =>
                handleAnswer(currentQuestion, value, type)
              }
            />
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {percentage}%
            </div>
            <p className="text-sm text-gray-500">
              {t(locale, "answered")} {answeredCount} / {total}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 grid grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const key = String(q.q_id ?? q.id);
              const isAnswered = answers[key] !== undefined;
              const isActive = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={clsx(
                    "cursor-pointer relative h-11 w-11 rounded-md",
                    "flex items-center justify-center",
                    "text-sm font-semibold transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    "active:scale-95",
                    {
                      "bg-blue-600 text-white shadow-md ring-2 ring-blue-400":
                        isActive,
                      "bg-emerald-500 text-white hover:bg-emerald-600":
                        !isActive && isAnswered,
                      "bg-gray-100 text-gray-700 hover:bg-gray-200":
                        !isActive && !isAnswered,
                    },
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </aside>
      </main>

      {/* FIXED BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
            className="cursor-pointer px-6 py-2 rounded-md border border-blue-500 text-blue-600 
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-blue-50 transition"
          >
            {t(locale, "previous")}
          </button>

          {currentIndex === total - 1 ? (
            <SubmitButton
              disabled={answeredCount !== total}
              onClick={() => alert("Submitted!")}
            />
          ) : (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="cursor-pointer px-6 py-2 rounded-md bg-blue-600 text-white 
                         hover:bg-blue-700 transition shadow-sm"
            >
              {t(locale, "next")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
