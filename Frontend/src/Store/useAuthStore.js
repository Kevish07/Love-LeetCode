import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistered: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/get-profile");

      set({ authUser: res.data });
    } catch (error) {
      // console.log("❌ Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  registers: async (data) => {
    set({ isRegistered: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error registration", error);
      toast.error("Error registration");
    } finally {
      set({ isRegistered: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
      return true;
    } catch (error) {
      console.log("Error logging in", error);
      toast.error("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },
}));
