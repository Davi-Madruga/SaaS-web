import { historyAppointments } from "../../mocks/mockData";
import Header from "../../components/Header";
/*
  Tela responsável por exibir
  os atendimentos já realizados.
*/

function AppointmentHistory() {
  return (
    <section>
       <Header
         title="Histórico"
         subtitle="Visualize os serviços realizados anteriormente."
        />

      <div className="appointments-list">

        {historyAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="appointment-card"
          >
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
              <strong>Status:</strong> Finalizado
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default AppointmentHistory;