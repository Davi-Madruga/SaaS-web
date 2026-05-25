export function getApiErrorMessage(error) {
  const data = error?.response?.data;

  if (!data) {
    return 'Não foi possível conectar ao servidor. Verifique se o backend Django está rodando.';
  }

  if (typeof data === 'string') {
    return data;
  }

  if (data.detail) {
    return data.detail;
  }

  const firstField = Object.keys(data)[0];

  if (firstField) {
    const value = data[firstField];
    if (Array.isArray(value)) return `${firstField}: ${value.join(', ')}`;
    return `${firstField}: ${value}`;
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}
