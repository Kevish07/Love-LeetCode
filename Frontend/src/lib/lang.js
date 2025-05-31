function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES[languageId] || "Unknown";
}

export { getLanguageName };

export function getLanguageId(language) {
  const languageMap = {
    Python: 71,
    JavaScript: 63,
    Java: 62,
    TypeScript: 74,
  };
  return languageMap[language];
}
