import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getLanguageName } from "../lib/lang";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    code,
    language_id,
    stdin,
    expected_outputs,
    problemId,
    problemTitle,
  ) => {
    try {
      set({ isExecuting: true });

      const source_code = { [getLanguageName(language_id)]: code };

      const res = await axiosInstance.post("/execution-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
        problemTitle,
      });
      console.log("Response:", res.data);

      set({ submission: res.data.data });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
