import type { Locale } from "./locale";

export type TranslationKey =
  | "appTitle"
  | "language"
  | "progress"
  | "question"
  | "previous"
  | "next"
  | "submit"
  | "answered"
  | "noOptions"
  | "yourAnswer"
  | "loading";

type TranslationMap = Record<TranslationKey, string>;

const translations: Record<Locale, TranslationMap> = {
  en: {
    appTitle: "Health Questionnaire",
    language: "Language",
    progress: "Progress",
    question: "Question",
    previous: "Previous",
    next: "Next",
    submit: "Submit",
    answered: "You answered",
    noOptions: "No options",
    yourAnswer: "Your answer...",
    loading: "Loading...",
  },

  ja: {
    appTitle: "健康アンケート",
    language: "言語",
    progress: "進捗",
    question: "質問",
    previous: "前へ",
    next: "次へ",
    submit: "送信",
    answered: "回答済み",
    noOptions: "選択肢がありません",
    yourAnswer: "あなたの回答...",
    loading: "読み込み中...",
  },
};

export const t = (locale: Locale, key: TranslationKey): string => {
  return translations[locale]?.[key] ?? translations.en[key];
};
