import axios, { AxiosInstance } from "axios";
import Router, { useRouter } from "next/router";
import defaultConfig from "./config";


export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: defaultConfig.Base_URL,
});

export const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {

      const authToken = "";
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (err: any) => {
      Promise.reject(err);
    }
  );

};


