import { useState } from "react";
import { appointments } from "../../mocks/mockData";
import AppointmentCard from "../../components/AppointmentCard";
import Header from "../../components/Header";

function MyAppointments() {
  const [myAppointments, setMyAppointments] = useState(appointments);

  function cancelAppointment(id) {
    const updatedAppointments = myAppointments.map((appointment) => {
      if (appointment.id === id) {
        return {
          ...appointment,
          status: "Cancelado"
        };
      }

      return appointment;
    });

    setMyAppointments(updatedAppointments);
  }

  return (
    <section>
       <Header
         title="Meus Agendamentos"
         subtitle="Acompanhe seus horários marcados."
        />

      <div className="appointments-list">
        {myAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancel={cancelAppointment}
          />
        ))}
      </div>
    </section>
  );
}

export default MyAppointments;
