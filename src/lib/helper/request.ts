import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
