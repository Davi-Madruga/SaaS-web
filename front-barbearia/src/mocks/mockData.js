export const barbers = [
  {
    id: 1,
    nome: "Davi",
    especialidade: "Degradê"
  },

  {
    id: 2,
    nome: "Luis",
    especialidade: "Barba"
  },

  {
    id: 3,
    nome: "José",
    especialidade: "Social"
  }
];

export const services = [
  {
    id: 1,
    nome: "Corte",
    preco: 35
  },

  {
    id: 2,
    nome: "Barba",
    preco: 20
  },

  {
    id: 3,
    nome: "Sobrancelha",
    preco: 10
  }
];

export const horarios = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00"
];
export const appointments = [
  {
    id: 1,
    barbeiro: "Davi",
    horario: "14:00",
    data: "20/05/2026",
    servicos: ["Corte", "Barba"],
    total: 55,
    status: "Confirmado"
  },

  {
    id: 2,
    barbeiro: "Luis",
    horario: "10:00",
    data: "22/05/2026",
    servicos: ["Corte"],
    total: 35,
    status: "Confirmado"
  }
  
];

/*
  Histórico de atendimentos já finalizados.
*/

export const historyAppointments = [
  {
    id: 1,
    barbeiro: "Davi",
    data: "02/05/2026",
    horario: "15:00",
    servicos: ["Corte", "Barba"],
    total: 55
  },

  {
    id: 2,
    barbeiro: "Luis",
    data: "10/05/2026",
    horario: "10:00",
    servicos: ["Corte"],
    total: 35
  }
];