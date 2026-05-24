import { httpClient } from './httpClient.js';
import { endpoints } from './endpoints.js';

function normalizeList(data) {
  return Array.isArray(data) ? data : data.results || [];
}

export const perfisService = {
  async listar() {
    const response = await httpClient.get(endpoints.perfis.list);
    return normalizeList(response.data);
  },

  async listarBarbeiros() {
    const perfis = await this.listar();
    return perfis.filter((perfil) => perfil.tipo === 'barbeiro');
  },

  async atualizar(id, data) {
    const response = await httpClient.patch(endpoints.perfis.detail(id), data);
    return response.data;
  }
};
