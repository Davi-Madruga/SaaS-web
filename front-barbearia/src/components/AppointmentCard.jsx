/*
  Card responsável por mostrar
  as informações do agendamento.
*/

function AppointmentCard({
  appointment,
  onCancel
}) {
  return (
    <div className="appointment-card">
      <h2>{appointment.barbeiro}</h2>

      <p>
        <strong>Data:</strong> {appointment.data}
      </p>

      <p>
        <strong>Horário:</strong> {appointment.horario}
      </p>

      <p>
        <strong>Serviços:</strong>{" "}
        {appointment.servicos.join(", ")}
      </p>

      <p>
        <strong>Total:</strong>{" "}
        R$ {appointment.total.toFixed(2)}
      </p>

      <p>
        <strong>Status:</strong> {appointment.status}
      </p>

      {/* Só exibe o botão se o agendamento estiver ativo */}
      {appointment.status !== "Cancelado" && (
        <button onClick={() => onCancel(appointment.id)}>
          Cancelar Agendamento
        </button>
      )}
    </div>
  );
}

export default AppointmentCard;