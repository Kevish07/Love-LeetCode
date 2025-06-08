import axios from "axios";
export const getJudge0LanguageId = async (language) => {
  const languageMap = {
    "Python": 71,
    "C++": 54,
    "Java": 62,
    "JavaScript": 63,
  };
  return languageMap[language];
};

export const submitBatch = async (submissions) => {

  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    {
    headers: {
      Authorization: `Bearer ${process.env.JUDGE0_API_KEY}`
    },
  }
  );

  // data = array or submission token
  return data;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
        headers: {
          Authorization: `Bearer ${process.env.JUDGE0_API_KEY}`
        },
      },
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2,
    );

    if (isAllDone) return results;
    await sleep(1000);
  }
};

export const getLanguageName = (languageId) => {
  const LanguageNames = {
    71:"Python",
    54:"C++",
    62:"Java",
    63:"JavaScript",
  }

  return LanguageNames[languageId] || "Unknown"
}