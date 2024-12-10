import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => req,
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err instanceof AxiosError) {
      console.error("Axios error:", err.response);
      return Promise.reject(err.response);
    } else {
      return Promise.reject(err);
    }
  }
);

export { axiosInstance };
