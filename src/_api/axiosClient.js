import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://116.109.211.183:5050/",
  baseURL: import.meta.env.VITE_BE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
  withCredentials: true,
});
axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use((res) => {
  try {
    return res;
  } catch (error) {
    // console.log(error, "in axiosClient");
    return res;
  }
});
export default axiosClient;
