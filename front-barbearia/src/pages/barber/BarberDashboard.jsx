import { useState } from "react";

import Header from "../../components/Header";

import {
  barberAppointments
} from "../../mocks/mockData";

/*
  Dashboard principal do barbeiro.
  Aqui ele consegue visualizar e editar
  os agendamentos do dia.
*/

function BarberDashboard() {

  // Estado dos agendamentos
  const [appointments, setAppointments] =
    useState(barberAppointments);

  /*
    Atualiza o status do atendimento.
  */
  function updateStatus(id, newStatus) {

    const updatedAppointments =
      appointments.map((appointment) => {

        if (appointment.id === id) {

          return {
            ...appointment,
            status: newStatus
          };
        }

        return appointment;
      });

    setAppointments(updatedAppointments);
  }

  return (
    <section>

      <Header
        title="Painel do Barbeiro"
        subtitle="Gerencie os atendimentos do dia."
      />

      <div className="appointments-list">

        {appointments.map((appointment) => (

          <div
            key={appointment.id}
            className="appointment-card"
          >

            <h2>{appointment.cliente}</h2>

            <p>
              <strong>Data:</strong>
              {" "}
              {appointment.data}
            </p>

            <p>
              <strong>Horário:</strong>
              {" "}
              {appointment.horario}
            </p>

            <p>
              <strong>Serviço:</strong>
              {" "}
              {appointment.servico}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              {appointment.status}
            </p>

            <div className="barber-actions">

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "Finalizado"
                  )
                }
              >
                Finalizar
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    appointment.id,
                    "Cancelado"
                  )
                }
              >
                Cancelar
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default BarberDashboard;