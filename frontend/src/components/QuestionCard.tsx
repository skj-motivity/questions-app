import type { Question } from "../types/question.types";
import OptionButton from "./OptionButton";

type Props = {
  question: Question;
  selectedValues: string[];
  onSelect: (questionId: number, value: string, type: string) => void;
};

const QuestionCard = ({ question, selectedValues, onSelect }: Props) => {
  const { id, attributes } = question;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border">
      <h2 className="text-lg font-semibold">{attributes.question}</h2>

      <div className="space-y-2">
        {attributes.options.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            selected={selectedValues.includes(option.value)}
            onClick={() => onSelect(id, option.value, attributes.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
