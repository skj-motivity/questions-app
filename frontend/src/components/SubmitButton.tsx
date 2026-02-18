import React from "react";
import { t } from "../services/translation";
import { getLocale } from "../services/locale";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

const SubmitButton: React.FC<Props> = ({ disabled = false, onClick }) => {
  const locale = getLocale();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer px-6 py-2 rounded-md
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
    >
      {t(locale, "submit")}
    </button>
  );
};

export default SubmitButton;
