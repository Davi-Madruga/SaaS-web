/*
  Configuração base da API.
  Futuramente será usada para conectar
  o frontend com o backend Java.
*/

const API_URL =
  "http://localhost:8080";

/*
  Função genérica para requisições.
*/

export async function request(
  endpoint,
  options = {}
) {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type":
          "application/json"
      },

      ...options
    }
  );

  // Converte resposta para JSON
  const data =
    await response.json();

  return data;
}