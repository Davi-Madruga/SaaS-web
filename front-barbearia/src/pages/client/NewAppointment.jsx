import { useEffect, useState } from "react";

import { getServices } from "../../services/serviceService";

import ServiceCard from "../../components/ServiceCard";
import Header from "../../components/Header";

import {
  blockedSchedules,
  barbers,
  horarios,
} from "../../mocks/mockData";

function NewAppointment() {

  // Barbeiro selecionado
  const [barberSelected, setBarberSelected] =
    useState(null);

  // Serviços vindos da API
  const [services, setServices] =
    useState([]);

  // Serviços escolhidos
  const [serviceSelected, setServiceSelected] =
    useState([]);

  // Horário escolhido
  const [horarioSelected, setHorarioSelected] =
    useState("");

  /*
    Carrega os serviços
    diretamente da API Django.
  */

  useEffect(() => {

    async function loadServices() {

      try {

        const data =
          await getServices();

        // Garante que sempre será array
        if (Array.isArray(data)) {

          setServices(data);

        } else {

          setServices([]);
        }

      } catch (error) {

        console.log(error);

        setServices([]);

        alert(
          "Erro ao carregar serviços."
        );
      }
    }

    loadServices();

  }, []);

  /*
    Calcula valor total
    do agendamento.
  */

  const total =
    serviceSelected.reduce(
      (soma, service) =>
        soma + Number(service.valor),
      0
    );

  /*
    Adiciona ou remove
    serviço selecionado.
  */

  function handleService(service) {

    const exists =
      serviceSelected.find(
        (item) =>
          item.id === service.id
      );

    if (exists) {

      setServiceSelected(

        serviceSelected.filter(
          (item) =>
            item.id !== service.id
        )
      );

    } else {

      setServiceSelected([
        ...serviceSelected,
        service
      ]);
    }
  }

  /*
    Valida e confirma
    agendamento.
  */

  function handleConfirm() {

    // Verifica se horário
    // está bloqueado

    const blocked =
      blockedSchedules.find(
        (schedule) =>
          schedule.horario ===
          horarioSelected
      );

    if (blocked) {

      alert(
        "Esse horário está bloqueado pelo barbeiro."
      );

      return;
    }

    alert(
      "Agendamento confirmado com sucesso!"
    );
  }

  return (

    <section>

      <Header
        title="Novo Agendamento"
        subtitle="Escolha barbeiro, horário e serviços."
      />

      {/* Escolha do barbeiro */}

      <div className="appointment-section">

        <h2>
          Escolha o barbeiro
        </h2>

        <div className="cards-grid">

          {barbers.map((barber) => (

            <ServiceCard
              key={barber.id}

              title={barber.nome}

              subtitle={
                barber.especialidade
              }

              selected={
                barberSelected?.id ===
                barber.id
              }

              onClick={() =>
                setBarberSelected(barber)
              }
            />
          ))}

        </div>

      </div>

      {/* Escolha do horário */}

      <div className="appointment-section">

        <h2>
          Escolha o horário
        </h2>

        <div className="cards-grid">

          {horarios.map((horario) => {

            // Verifica se horário
            // está bloqueado

            const blocked =
              blockedSchedules.find(
                (schedule) =>
                  schedule.horario ===
                  horario
              );

            return (

              <button
                key={horario}

                disabled={blocked}

                className={
                  horarioSelected === horario
                    ? "card selected"
                    : blocked
                    ? "card blocked"
                    : "card"
                }

                onClick={() =>
                  setHorarioSelected(horario)
                }
              >

                <strong>
                  {horario}
                </strong>

                <span>

                  {blocked
                    ? "Indisponível"
                    : "Disponível"}

                </span>

              </button>
            );
          })}

        </div>

      </div>

      {/* Escolha dos serviços */}

      <div className="appointment-section">

        <h2>
          Escolha os serviços
        </h2>

        <div className="cards-grid">

          {Array.isArray(services) &&
            services.map((service) => {

              const selected =
                serviceSelected.find(
                  (item) =>
                    item.id === service.id
                );

              return (

                <ServiceCard
                  key={service.id}

                  title={service.nome}

                  subtitle={
                    `R$ ${Number(
                      service.valor
                    ).toFixed(2)}`
                  }

                  selected={!!selected}

                  onClick={() =>
                    handleService(service)
                  }
                />
              );
            })}

        </div>

      </div>

      {/* Resumo do agendamento */}

      <div className="summary-card">

        <h2>
          Resumo do agendamento
        </h2>

        <p>

          <strong>
            Barbeiro:
          </strong>{" "}

          {barberSelected
            ? barberSelected.nome
            : "Não selecionado"}

        </p>

        <p>

          <strong>
            Horário:
          </strong>{" "}

          {horarioSelected ||
            "Não selecionado"}

        </p>

        <p>

          <strong>
            Total:
          </strong>{" "}

          R$ {total.toFixed(2)}

        </p>

        <button

          disabled={
            !barberSelected ||
            !horarioSelected ||
            serviceSelected.length === 0
          }

          onClick={handleConfirm}
        >

          Confirmar Agendamento

        </button>

      </div>

    </section>
  );
}

export default NewAppointment;