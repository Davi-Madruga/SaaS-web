import { useState } from "react";
import { barbers, services, horarios } from "../../mocks/mockData";
import ServiceCard from "../../components/ServiceCard";
import Header from "../../components/Header";
function NewAppointment() {
  const [barberSelected, setBarberSelected] = useState(null);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [horarioSelected, setHorarioSelected] = useState("");

  const total = serviceSelected.reduce((soma, service) => soma + service.preco, 0);

  function handleService(service) {
    const exists = serviceSelected.find((item) => item.id === service.id);

    if (exists) {
      setServiceSelected(serviceSelected.filter((item) => item.id !== service.id));
    } else {
      setServiceSelected([...serviceSelected, service]);
    }
  }

  function handleConfirm() {
    alert("Agendamento confirmado com sucesso!");
  }

  return (
    <section>
           <Header
             title="Novo Agendamento"
             subtitle="Escolha barbeiro, horário e serviços."
           />

      <div className="appointment-section">
        <h2>Escolha o barbeiro</h2>

        <div className="cards-grid">
          {barbers.map((barber) => (
            <ServiceCard
              key={barber.id}
              title={barber.nome}
              subtitle={barber.especialidade}
              selected={barberSelected?.id === barber.id}
              onClick={() => setBarberSelected(barber)}
            />
          ))}
        </div>
      </div>

      <div className="appointment-section">
        <h2>Escolha o horário</h2>

        <div className="cards-grid">
          {horarios.map((horario) => (
            <ServiceCard
               key={horario}
               title={horario}
               subtitle="Disponível"
              selected={horarioSelected === horario}
              onClick={() => setHorarioSelected(horario)}
            />
          ))}
        </div>
      </div>

      <div className="appointment-section">
        <h2>Escolha os serviços</h2>

        <div className="cards-grid">
          {services.map((service) => {
            const selected = serviceSelected.find((item) => item.id === service.id);

            return (
             <ServiceCard
               key={service.id}
               title={service.nome}
               subtitle={`R$ ${service.preco.toFixed(2)}`}
               selected={selected}
              onClick={() => handleService(service)}
              />
            );
          })}
        </div>
      </div>

      <div className="summary-card">
        <h2>Resumo do agendamento</h2>

        <p>
          <strong>Barbeiro:</strong>{" "}
          {barberSelected ? barberSelected.nome : "Não selecionado"}
        </p>

        <p>
          <strong>Horário:</strong>{" "}
          {horarioSelected || "Não selecionado"}
        </p>

        <p>
          <strong>Total:</strong> R$ {total.toFixed(2)}
        </p>

        <button
          disabled={!barberSelected || !horarioSelected || serviceSelected.length === 0}
          onClick={handleConfirm}
        >
          Confirmar Agendamento
        </button>
      </div>
    </section>
  );
}

export default NewAppointment;