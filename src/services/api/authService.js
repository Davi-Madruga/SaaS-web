import { env } from '../../config/env.js';
import { httpClient } from './httpClient.js';
import { endpoints } from './endpoints.js';
import { tokenStorage } from '../storage/tokenStorage.js';

function decodeJwtPayload(token) {
  try {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

async function buscarMeuPerfil(loginEmail) {
  const response = await httpClient.get(endpoints.perfis.list);
  const result = Array.isArray(response.data) ? response.data : response.data.results || [];

  if (loginEmail) {
    const profileByEmail = result.find(
      (perfil) => perfil.email?.toLowerCase() === loginEmail.toLowerCase()
    );

    if (profileByEmail) return profileByEmail;
  }

  return result[0] || null;
}

export const authService = {
  async login({ login, password }) {
    const payload = {
      [env.loginField]: login,
      password
    };

    const response = await httpClient.post(endpoints.auth.token, payload);
    const { access, refresh, user } = response.data;

    tokenStorage.saveTokens({ access, refresh });

    let resolvedUser = user || null;

    if (!resolvedUser) {
      resolvedUser = await buscarMeuPerfil(login);
    }

    if (!resolvedUser) {
      const tokenPayload = decodeJwtPayload(access);
      resolvedUser = {
        id: tokenPayload?.user_id,
        nome: login,
        email: login,
        tipo: 'cliente'
      };
    }

    tokenStorage.saveUser(resolvedUser);
    return resolvedUser;
  },

  async register(data) {
    const response = await httpClient.post(endpoints.auth.registro, data);
    return response.data;
  },

  async loadCurrentUser() {
    const localUser = tokenStorage.getUser();
    const token = tokenStorage.getAccessToken();

    if (!token) return null;
    if (localUser) return localUser;

    const user = await buscarMeuPerfil();
    if (user) tokenStorage.saveUser(user);
    return user;
  },

  logout() {
    tokenStorage.clear();
  }
};
