import { httpClient } from './httpClient.js';
import { endpoints } from './endpoints.js';

function normalizeList(data) {
  return Array.isArray(data) ? data : data.results || [];
}

async function postUsuario(payload) {
  try {
    return await httpClient.post(endpoints.usuarios.list, payload);
  } catch (error) {
    if ([404, 405].includes(error?.response?.status) && endpoints.usuarios.alternateList) {
      return await httpClient.post(endpoints.usuarios.alternateList, payload);
    }
    throw error;
  }
}

async function patchUsuario(usuarioId, payload) {
  try {
    return await httpClient.patch(endpoints.usuarios.detail(usuarioId), payload);
  } catch (error) {
    if ([404, 405].includes(error?.response?.status) && endpoints.usuarios.alternateDetail) {
      return await httpClient.patch(endpoints.usuarios.alternateDetail(usuarioId), payload);
    }
    throw error;
  }
}

export const perfisService = {
  async listar() {
    const response = await httpClient.get(endpoints.perfis.list);
    return normalizeList(response.data);
  },

  async detalhar(id) {
    const response = await httpClient.get(endpoints.perfis.detail(id));
    return response.data;
  },

  // ✅ CORRIGIDO: agora usa rota correta do backend
  async listarBarbeiros() {
    const response = await httpClient.get('/api/barbeiros/');
    return normalizeList(response.data);
  },

  async listarClientes() {
    const perfis = await this.listar();
    return perfis.filter((perfil) => perfil.tipo === 'cliente');
  },

  async criarBarbeiro(data) {
    const payload = {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      password: data.password,
      tipo: 'barbeiro'
    };

    const response = await postUsuario(payload);
    return response.data;
  },

  async atualizar(id, data) {
    const response = await httpClient.patch(endpoints.perfis.detail(id), data);
    return response.data;
  },

  async atualizarUsuario(usuarioId, data) {
    const payload = {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email
    };

    if (data.password) {
      payload.password = data.password;
    }

    const response = await patchUsuario(usuarioId, payload);
    return response.data;
  }
};