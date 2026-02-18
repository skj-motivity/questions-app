export type Option = {
  id: number;
  option: string;
  free_text?: string | null;
};

export type Question = {
  id: number;
  documentId?: string;
  question: string;
  type?:
    | "multi-select"
    | "single-select"
    | "dropdown"
    | "free-text"
    | "text"
    | "multi-with-text"
    | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  free_text?: string | null;
  options?: Option[];
};
