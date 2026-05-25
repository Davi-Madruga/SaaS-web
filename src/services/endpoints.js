export const endpoints = {
  auth: {
    login: '/api/token/',
    refresh: '/api/token/refresh/',
    registerClient: '/api/clientes/'
  },
  usuarios: {
    list: '/api/usuario/',
    alternateList: '/api/usuarios/',
    detail: (id) => `/api/usuario/${id}/`,
    alternateDetail: (id) => `/api/usuarios/${id}/`
  },
  perfis: {
    list: '/api/perfis/',
    detail: (id) => `/api/perfis/${id}/`
  },
  servicos: {
    list: '/api/servicos/',
    detail: (id) => `/api/servicos/${id}/`
  },
  agendamentos: {
    list: '/api/agendamentos/',
    detail: (id) => `/api/agendamentos/${id}/`
  }
};
