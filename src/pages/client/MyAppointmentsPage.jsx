import { useEffect, useState } from 'react';
import { AppointmentCard } from '../../components/cards/AppointmentCard.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { agendamentosService } from '../../services/api/agendamentosService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';
import { canCancelAppointment } from '../../utils/dateRules.js';

export function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
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

  async function handleCancel(appointment) {
    setError('');
    setSuccess('');

    if (!canCancelAppointment(appointment.data_hora)) {
      setError('Cancelamento não permitido. É necessário cancelar com pelo menos 24 horas de antecedência.');
      return;
    }

    try {
      await agendamentosService.cancelar(appointment.id);
      setSuccess('Agendamento cancelado com sucesso.');
      await loadAppointments();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader
        title="Meus agendamentos"
        description="Visualize seus horários e cancele quando a regra de 24 horas permitir."
      />

      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      <div className="list-stack">
        {appointments.length === 0 ? (
          <EmptyState title="Nenhum agendamento encontrado" description="Quando houver agendamentos, eles aparecerão aqui." />
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onCancel={handleCancel} />
          ))
        )}
      </div>
    </>
  );
}
