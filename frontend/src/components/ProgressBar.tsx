import React from "react";

type Props = {
  answered: number;
  total: number;
};

const ProgressBar: React.FC<Props> = ({ answered, total }) => {
  const percentage = total === 0 ? 0 : (answered / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
        <span>Progress</span>
        <span>
          {answered} / {total}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
