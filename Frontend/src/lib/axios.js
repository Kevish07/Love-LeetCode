import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://love-leetcode-backend.onrender.com/api/v1"
      : "https://love-leetcode-backend.onrender.com/api/v1",
  withCredentials: true,
});
