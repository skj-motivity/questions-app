import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337"}`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
  },
});
