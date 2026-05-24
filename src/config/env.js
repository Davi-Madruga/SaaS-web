export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  loginField: import.meta.env.VITE_LOGIN_FIELD || 'email',
  endpoints: {
    registro: import.meta.env.VITE_REGISTRO_ENDPOINT || '/api/clientes/',
    token: import.meta.env.VITE_TOKEN_ENDPOINT || '/api/token/',
    tokenRefresh: import.meta.env.VITE_TOKEN_REFRESH_ENDPOINT || '/api/token/refresh/',
    perfis: import.meta.env.VITE_PERFIS_ENDPOINT || '/api/perfis/',
    servicos: import.meta.env.VITE_SERVICOS_ENDPOINT || '/api/servicos/',
    agendamentos: import.meta.env.VITE_AGENDAMENTOS_ENDPOINT || '/api/agendamentos/'
  }
};
