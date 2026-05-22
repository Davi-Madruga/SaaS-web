import { request } from "./api";

/*
  Serviço responsável pelos
  agendamentos da aplicação.
*/

/*
  Busca todos os agendamentos.
*/
export async function getAppointments() {

  return request("/appointments");
}

/*
  Cria um novo agendamento.
*/
export async function createAppointment(
  body
) {

  return request("/appointments", {
    method: "POST",

    body: JSON.stringify(body)
  });
}