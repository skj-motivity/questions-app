import type { Question, Option } from "../types/question.types";
import OptionButton from "./OptionButton";

type Props = {
  question: Question;
  selectedAnswer?: string | string[];
  onAnswer: (questionId: number, value: string, type: string | null) => void;
};

const QuestionCard = ({ question, selectedAnswer, onAnswer }: Props) => {
  const { id, question: questionText, type, options } = question;

  const isSelected = (optionValue: string) => {
    if (Array.isArray(selectedAnswer))
      return selectedAnswer.includes(optionValue);
    return selectedAnswer === optionValue;
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border">
      <h2 className="text-lg font-semibold">{questionText}</h2>

      <div className="space-y-2">
        {options?.map((option: Option) => (
          <OptionButton
            key={option.id}
            label={option.option}
            selected={isSelected(option.option)}
            onClick={() => onAnswer(id, option.option, type)}
          />
        )) || <p className="text-sm text-gray-500">No options</p>}
      </div>
    </div>
  );
};

export default QuestionCard;
