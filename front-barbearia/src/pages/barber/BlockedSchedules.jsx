import { useState } from "react";

import Header from "../../components/Header";

import {
  blockedSchedules
} from "../../mocks/mockData";

/*
  Tela responsável pelo gerenciamento
  dos horários bloqueados do barbeiro.
*/

function BlockedSchedules() {

  // Lista de horários bloqueados
  const [schedules, setSchedules] =
    useState(blockedSchedules);

  // Estados do formulário
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [motivo, setMotivo] = useState("");

  /*
    Adiciona um novo bloqueio na lista.
  */
  function handleBlockSchedule() {

    // Validação simples dos campos
    if (!data || !horario || !motivo) {
      alert("Preencha todos os campos.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      data,
      horario,
      motivo
    };

    setSchedules([
      ...schedules,
      newSchedule
    ]);

    // Limpa os campos após cadastrar
    setData("");
    setHorario("");
    setMotivo("");
  }

  /*
    Remove um bloqueio da agenda.
  */
  function removeSchedule(id) {

    const updatedSchedules =
      schedules.filter(
        (schedule) => schedule.id !== id
      );

    setSchedules(updatedSchedules);
  }

  return (
    <section>

      <Header
        title="Bloqueio de Agenda"
        subtitle="Gerencie horários indisponíveis."
      />

      <div className="block-form">

        <input
          type="date"
          value={data}
          onChange={(e) =>
            setData(e.target.value)
          }
        />

        <input
          type="time"
          value={horario}
          onChange={(e) =>
            setHorario(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Motivo do bloqueio"
          value={motivo}
          onChange={(e) =>
            setMotivo(e.target.value)
          }
        />

        <button onClick={handleBlockSchedule}>
          Bloquear Horário
        </button>

      </div>

      <div className="appointments-list">

        {schedules.map((schedule) => (

          <div
            key={schedule.id}
            className="appointment-card"
          >

            <h2>{schedule.data}</h2>

            <p>
              <strong>Horário:</strong>
              {" "}
              {schedule.horario}
            </p>

            <p>
              <strong>Motivo:</strong>
              {" "}
              {schedule.motivo}
            </p>

            <button
              onClick={() =>
                removeSchedule(schedule.id)
              }
            >
              Remover Bloqueio
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default BlockedSchedules;