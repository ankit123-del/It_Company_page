import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "mr", label: "मराठी", flag: "🇮🇳" },
  ];

  return (
    <select
      className="language-selector"
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
