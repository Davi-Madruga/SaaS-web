import axios from "axios";

/*
  Instância principal da API.
*/

export const api = axios.create({

  baseURL:
    "http://localhost:8080",

  headers: {
    "Content-Type":
      "application/json"
  }
});

/*
  Adiciona token automaticamente
  nas requisições autenticadas.
*/

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);