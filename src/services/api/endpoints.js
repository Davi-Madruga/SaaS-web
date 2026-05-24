import { env } from '../../config/env.js';

function detail(base, id) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${id}/`;
}

export const endpoints = {
  auth: {
    registro: env.endpoints.registro,
    token: env.endpoints.token,
    tokenRefresh: env.endpoints.tokenRefresh
  },
  perfis: {
    list: env.endpoints.perfis,
    detail: (id) => detail(env.endpoints.perfis, id)
  },
  servicos: {
    list: env.endpoints.servicos,
    detail: (id) => detail(env.endpoints.servicos, id)
  },
  agendamentos: {
    list: env.endpoints.agendamentos,
    detail: (id) => detail(env.endpoints.agendamentos, id)
  }
};
