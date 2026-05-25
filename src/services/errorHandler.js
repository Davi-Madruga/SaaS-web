export function getApiErrorMessage(error) {
  const data = error?.response?.data;

  if (!data) return 'Não foi possível concluir a operação.';
  if (typeof data === 'string') return data;
  if (data.detail) return data.detail;
  if (data.non_field_errors) return data.non_field_errors.join(' ');

  const first = Object.entries(data)[0];
  if (first) {
    const [field, value] = first;
    return `${field}: ${Array.isArray(value) ? value.join(' ') : value}`;
  }

  return 'Não foi possível concluir a operação.';
}
