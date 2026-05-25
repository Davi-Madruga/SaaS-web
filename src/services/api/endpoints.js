import { env } from '../../config/env.js';

function detail(base, id) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${id}/`;
}

function normalizeEndpoint(endpoint) {
  return endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
}

function alternateUsuarioEndpoint(endpoint) {
  const normalized = normalizeEndpoint(endpoint);

  if (normalized.endsWith('/usuario/')) {
    return normalized.replace(/\/usuario\/$/, '/usuarios/');
  }

  if (normalized.endsWith('/usuarios/')) {
    return normalized.replace(/\/usuarios\/$/, '/usuario/');
  }

  return null;
}

const usuariosBase = normalizeEndpoint(env.endpoints.usuarios);
const usuariosAlt = alternateUsuarioEndpoint(usuariosBase);

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
  usuarios: {
    list: usuariosBase,
    alternateList: usuariosAlt,
    detail: (id) => detail(usuariosBase, id),
    alternateDetail: usuariosAlt ? (id) => detail(usuariosAlt, id) : null
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
