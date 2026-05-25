import { httpClient } from './httpClient.js';
import { endpoints } from './endpoints.js';

function normalizeList(data) {
  return Array.isArray(data) ? data : data.results || [];
}

export const agendamentosService = {
  async listar() {
    const response = await httpClient.get(endpoints.agendamentos.list);
    return normalizeList(response.data);
  },

  async criar(data) {
    // Backend esperado: cliente vem do token em perform_create().
    // Enviamos barbeiro, servicos e data_hora.
    const response = await httpClient.post(endpoints.agendamentos.list, data);
    return response.data;
  },

  async atualizar(id, data) {
    const response = await httpClient.patch(endpoints.agendamentos.detail(id), data);
    return response.data;
  },

  async cancelar(id) {
    try {
      const response = await httpClient.patch(endpoints.agendamentos.detail(id), {
        status: 'cancelado'
      });
      return response.data;
    } catch (error) {
      // Caso seu backend não tenha campo status, o DELETE do ModelViewSet padrão remove o agendamento.
      if ([400, 404, 405].includes(error.response?.status)) {
        await httpClient.delete(endpoints.agendamentos.detail(id));
        return null;
      }
      throw error;
    }
  }
};
