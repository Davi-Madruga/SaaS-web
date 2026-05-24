import { formatCurrency, formatDateTime } from '../../utils/formatters.js';

export function AppointmentCard({ appointment, onCancel, onEdit, showActions = true }) {
  const servicos = appointment.servicos_detalhes || appointment.servicos || [];
  const total = appointment.valor_total || appointment.valorTotal || appointment.total;

  return (
    <article className="card appointment-card">
      <div>
        <h3>Agendamento #{appointment.id}</h3>
        <p>{formatDateTime(appointment.data_hora)}</p>
      </div>

      <div className="appointment-grid">
        <span>
          <strong>Cliente</strong>
          {appointment.cliente_nome || appointment.cliente?.nome || appointment.cliente || 'Não informado'}
        </span>
        <span>
          <strong>Barbeiro</strong>
          {appointment.barbeiro_nome || appointment.barbeiro?.nome || appointment.barbeiro || 'Não informado'}
        </span>
        <span>
          <strong>Serviços</strong>
          {Array.isArray(servicos)
            ? servicos.map((servico) => servico.nome || servico).join(', ')
            : 'Não informado'}
        </span>
        <span>
          <strong>Status</strong>
          {appointment.status || 'agendado'}
        </span>
        {total && (
          <span>
            <strong>Total</strong>
            {formatCurrency(total)}
          </span>
        )}
      </div>

      {showActions && (
        <div className="card-actions">
          {onEdit && (
            <button type="button" className="secondary-button" onClick={() => onEdit(appointment)}>
              Editar
            </button>
          )}
          {onCancel && (
            <button type="button" className="danger-button" onClick={() => onCancel(appointment)}>
              Cancelar
            </button>
          )}
        </div>
      )}
    </article>
  );
}
