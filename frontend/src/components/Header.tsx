import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "../services/locale";
import { t } from "../services/translation";

type Props = {
  locale: Locale;
  onLocaleChange: (l: Locale) => void;
};

const Header: React.FC<Props> = ({ locale, onLocaleChange }) => {
  return (
    <header className="w-full bg-white border-solid border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-blue-600">
            {t(locale, "appTitle")}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {t(locale, "language")}:
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
