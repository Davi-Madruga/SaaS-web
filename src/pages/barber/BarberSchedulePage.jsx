import { useEffect, useState } from 'react';
import { AppointmentCard } from '../../components/cards/AppointmentCard.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { agendamentosService } from '../../services/api/agendamentosService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';

export function BarberSchedulePage() {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ data_hora: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function loadAppointments() {
    try {
      const data = await agendamentosService.listar();
      setAppointments(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  function startEdit(appointment) {
    setEditing(appointment);
    setForm({
      data_hora: appointment.data_hora?.slice(0, 16) || '',
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await agendamentosService.atualizar(editing.id, form);
      setSuccess('Agendamento atualizado com sucesso.');
      setEditing(null);
      await loadAppointments();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader title="Agenda" />
      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      {editing && (
        <form className="card form" onSubmit={handleSubmit}>
          <h2 className="full-row">Editar agendamento #{editing.id}</h2>
          <label>
            Data e horário
            <input
              type="datetime-local"
              value={form.data_hora}
              onChange={(event) => setForm((current) => ({ ...current, data_hora: event.target.value }))}
            />
          </label>
          <div className="card-actions">
            <button type="submit" className="primary-button">Salvar</button>
            <button type="button" className="secondary-button" onClick={() => setEditing(null)}>Cancelar edição</button>
          </div>
        </form>
      )}

      <div className="list-stack">
        {appointments.length === 0 ? (
          <EmptyState title="Nenhum agendamento" description="Os agendamentos aparecerão aqui." />
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onEdit={startEdit} onCancel={null} />
          ))
        )}
      </div>
    </>
  );
}
