export type Option = {
  id: number;
  label: string;
  value: string;
};

export type QuestionAttributes = {
  question: string;
  type: "single-select" | "multi-select";
  free_text: string | null;
  options: Option[];
};

export type Question = {
  id: number;
  attributes: QuestionAttributes;
};
