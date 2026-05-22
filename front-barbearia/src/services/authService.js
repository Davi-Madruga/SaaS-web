import { api } from "./api";

/*
  Serviço responsável pela autenticação.
*/

/*
  Realiza login.
*/

export async function login(
  username,
  password
) {

  const response =
    await api.post(
      "/api/token/",
      {
        username,
        password
      }
    );

  // Salva token localmente
  localStorage.setItem(
    "token",
    response.data.access
  );

  localStorage.setItem(
    "refresh",
    response.data.refresh
  );

  return response.data;
}

/*
  Remove sessão do usuário.
*/

export function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("refresh");
}