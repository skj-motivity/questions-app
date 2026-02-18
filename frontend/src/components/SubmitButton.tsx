import React from "react";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

const SubmitButton: React.FC<Props> = ({ disabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 mt-6 rounded-lg text-white font-semibold transition 
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
