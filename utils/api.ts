import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { config } from "../config";

const api: AxiosInstance = axios.create({
  baseURL: "https://api-barber-shop-7qds.onrender.com/api",
});

// api.interceptors.request.use(
//   (config) => {
//     // Get the bearer token from wherever you store it (localStorage, state, etc.)
//     const token = Cookies.get("token"); // Replace this with your actual logic to retrieve the token

//     if (token) {
//       // If a token is available, set it in the request headers
//       config.headers.Authorization = `${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
