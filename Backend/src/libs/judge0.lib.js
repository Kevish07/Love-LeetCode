
import axios from "axios"
export const getJudge0LanguageId = async (language) => {
  const languageMap = {
    JAVASCRIPT: 63,
    PYTHON: 71,
    "C++": 54,
  };
  return languageMap[language.toUpperCase()];
};

export const submitBatch = async (submissions) => {
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{submissions})

    console.log(`Submission Data: ${data}`)
    // data = array or submission token
    return data
}

const sleep = (delay)=> new Promise((resolve,reject) => setTimeout(resolve,delay))

export const pollBatchResults =  async (tokens) => {
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const results = data.submissions

        const isAllDone = results.every((response)=> response.status.id !==1 && response.status.id !== 2)

        if (isAllDone) return results
        await sleep(1000)
    }
}