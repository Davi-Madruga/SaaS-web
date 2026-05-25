import { useEffect, useMemo, useState } from 'react';
import { AppointmentCard } from '../../components/cards/AppointmentCard.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { agendamentosService } from '../../services/api/agendamentosService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';

export function HistoryPage() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await agendamentosService.listar();
        setAppointments(data);
      } catch (err) {
        setError(getApiErrorMessage(err));
      }
    }

    load();
  }, []);

  const history = useMemo(() => {
    const now = new Date();
    return appointments.filter((appointment) => new Date(appointment.data_hora) < now);
  }, [appointments]);

  return (
    <>
      <PageHeader title="Histórico de atendimentos" description="Lista de serviços já realizados anteriormente." />
      <Alert type="error">{error}</Alert>

      <div className="list-stack">
        {history.length === 0 ? (
          <EmptyState title="Histórico vazio" description="Os atendimentos concluídos aparecerão aqui." />
        ) : (
          history.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} showActions={false} />
          ))
        )}
      </div>
    </>
  );
}
