import { httpClient } from './httpClient.js';
import { endpoints } from './endpoints.js';

function normalizeList(data) {
  return Array.isArray(data) ? data : data.results || [];
}

export const servicosService = {
  async listar() {
    const response = await httpClient.get(endpoints.servicos.list);
    return normalizeList(response.data);
  },

  async criar(data) {
    const response = await httpClient.post(endpoints.servicos.list, data);
    return response.data;
  },

  async atualizar(id, data) {
    const response = await httpClient.patch(endpoints.servicos.detail(id), data);
    return response.data;
  },

  async remover(id) {
    await httpClient.delete(endpoints.servicos.detail(id));
  }
};
