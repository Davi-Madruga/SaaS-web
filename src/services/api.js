import { endpoints } from './endpoints.js';
import { httpClient } from './httpClient.js';
import { tokenStorage } from './tokenStorage.js';

function normalizeList(data) {
  return Array.isArray(data) ? data : data?.results || [];
}

function removeBlankPassword(payload) {
  const data = { ...payload };

  if (!data.password || String(data.password).trim() === '') {
    delete data.password;
  }

  return data;
}

export const authApi = {
  async login({ email, password }) {
    const response = await httpClient.post(endpoints.auth.login, { email, password });
    tokenStorage.setTokens(response.data);

    const perfis = await perfisApi.listar();
    const user = perfis.find((perfil) => perfil.email === email) || perfis[0] || null;

    if (user) tokenStorage.setUser(user);
    return user;
  },

  async registerClient(payload) {
    return httpClient.post(endpoints.auth.registerClient, payload);
  },

  logout() {
    tokenStorage.clear();
  },

  getCurrentUser() {
    return tokenStorage.getUser();
  }
};

export const perfisApi = {
  async listar() {
    const response = await httpClient.get(endpoints.perfis.list);
    return normalizeList(response.data);
  },

  async detalhar(id) {
    const response = await httpClient.get(endpoints.perfis.detail(id));
    return response.data;
  },

  async atualizar(id, payload) {
    const response = await httpClient.patch(endpoints.perfis.detail(id), removeBlankPassword(payload));
    return response.data;
  },

  async listarBarbeiros() {
    const perfis = await this.listar();
    return perfis.filter((perfil) => perfil.tipo === 'barbeiro');
  },

  async listarClientes() {
    const perfis = await this.listar();
    return perfis.filter((perfil) => perfil.tipo === 'cliente');
  }
};

export const usuariosApi = {
  async listar(params = {}) {
    try {
      const response = await httpClient.get(endpoints.usuarios.list, { params });
      return normalizeList(response.data);
    } catch (error) {
      if ([404, 405].includes(error?.response?.status) && endpoints.usuarios.alternateList) {
        const response = await httpClient.get(endpoints.usuarios.alternateList, { params });
        return normalizeList(response.data);
      }
      throw error;
    }
  },

  async detalhar(id) {
    try {
      const response = await httpClient.get(endpoints.usuarios.detail(id));
      return response.data;
    } catch (error) {
      if ([404, 405].includes(error?.response?.status) && endpoints.usuarios.alternateDetail) {
        const response = await httpClient.get(endpoints.usuarios.alternateDetail(id));
        return response.data;
      }
      throw error;
    }
  },

  async listarBarbeiros() {
    return this.listar({ tipo: 'barbeiro' });
  },

  async listarClientes() {
    return this.listar({ tipo: 'cliente' });
  },

  async criarBarbeiro(payload) {
    try {
      const response = await httpClient.post(endpoints.usuarios.list, {
        ...payload,
        tipo: 'barbeiro'
      });
      return response.data;
    } catch (error) {
      if ([404, 405].includes(error?.response?.status) && endpoints.usuarios.alternateList) {
        const response = await httpClient.post(endpoints.usuarios.alternateList, {
          ...payload,
          tipo: 'barbeiro'
        });
        return response.data;
      }
      throw error;
    }
  },

  async atualizar(id, payload) {
    try {
      const response = await httpClient.patch(endpoints.usuarios.detail(id), removeBlankPassword(payload));
      return response.data;
    } catch (error) {
      if ([404, 405].includes(error?.response?.status) && endpoints.usuarios.alternateDetail) {
        const response = await httpClient.patch(endpoints.usuarios.alternateDetail(id), removeBlankPassword(payload));
        return response.data;
      }
      throw error;
    }
  }
};

export const servicosApi = {
  async listar() {
    const response = await httpClient.get(endpoints.servicos.list);
    return normalizeList(response.data);
  },

  async criar(payload) {
    const response = await httpClient.post(endpoints.servicos.list, payload);
    return response.data;
  },

  async atualizar(id, payload) {
    const response = await httpClient.patch(endpoints.servicos.detail(id), payload);
    return response.data;
  },

  async remover(id) {
    await httpClient.delete(endpoints.servicos.detail(id));
  }
};

export const agendamentosApi = {
  async listar() {
    const response = await httpClient.get(endpoints.agendamentos.list);
    return normalizeList(response.data);
  },

  async criar(payload) {
    const response = await httpClient.post(endpoints.agendamentos.list, payload);
    return response.data;
  },

  async atualizar(id, payload) {
    const response = await httpClient.patch(endpoints.agendamentos.detail(id), payload);
    return response.data;
  },

  async remover(id) {
    await httpClient.delete(endpoints.agendamentos.detail(id));
  }
};
