import api from "./api";

/*
  Busca todos os serviços.
*/

export async function getServices() {

  // Pega token salvo
  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await api.get(
      "/servicos/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
}