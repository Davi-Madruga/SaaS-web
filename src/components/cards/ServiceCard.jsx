import { formatCurrency } from '../../utils/formatters.js';

export function ServiceCard({ service, selected, onToggle }) {
  return (
    <button
      type="button"
      className={`service-card ${selected ? 'selected' : ''}`}
      onClick={() => onToggle(service.id)}
    >
      <strong>{service.nome}</strong>
      <span>{formatCurrency(service.valor)}</span>
      <small>{service.duracao_minutos} min</small>
    </button>
  );
}
