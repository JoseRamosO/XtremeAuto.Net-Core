import axios from "axios";
import { store } from "../store/store";

export const baseApi = axios.create({
  baseURL: "http://localhost:5088/api"
});

baseApi.interceptors.request.use(function (config) {
  const token = store.getState()?.usuarios.currentUser?.token;
    config.headers.Authorization = `Bearer ${ token }`;
    return config;
});