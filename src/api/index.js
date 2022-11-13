
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://be-template-19127186.herokuapp.com/",
  // baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.token = `${token}` || "";
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 400) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const result = await axiosClient.post("/refreshToken", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      if (result?.errorCode) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return;
      }
      localStorage.setItem("token", result?.data?.token);
      localStorage.setItem("refreshToken", result?.data?.refreshToken);
      axiosClient.defaults.headers.common["token"] =
        result?.data?.token;

      return axiosClient(originalRequest);
    }
  }
);

export { axiosClient };