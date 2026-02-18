import { useCallback } from "react";
import type { Question, Option } from "../types/question.types";
import OptionButton from "./OptionButton";

type Props = {
  question: Question;
  selectedAnswer?: string | string[];
  onAnswer: (questionId: number, value: string, type: string | null) => void;
};

const QuestionCard = ({ question, selectedAnswer, onAnswer }: Props) => {
  const { id, question: questionText, type, options } = question;

  const isSelected = useCallback(
    (optionValue: string) => {
      if (Array.isArray(selectedAnswer))
        return selectedAnswer.includes(optionValue);
      return selectedAnswer === optionValue;
    },
    [selectedAnswer],
  );

  if (type === "text" || type === "free-text") {
    const value = typeof selectedAnswer === "string" ? selectedAnswer : "";

    return (
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border max-h-95 overflow-y-auto">
        <h2 className="text-lg font-semibold">{questionText}</h2>
        <textarea
          className="w-full border rounded-md p-3 max-h-65 min-h-30 overflow-y-auto text-sm"
          value={value}
          onChange={(e) => onAnswer(id, e.target.value, type ?? null)}
          placeholder="Your answer..."
        />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-md p-6 space-y-4 border max-h-95 overflow-y-auto">
      <h2 className="text-lg font-semibold">{questionText}</h2>

      <div className="space-y-2">
        {options && options.length > 0 ? (
          options.map((option: Option) => (
            <OptionButton
              key={option.id}
              label={option.option}
              selected={isSelected(option.option)}
              onClick={() => onAnswer(id, option.option, type ?? null)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No options</p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
