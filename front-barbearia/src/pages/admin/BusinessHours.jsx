import { useState } from "react";

import Header from "../../components/Header";

import {
  businessHours
} from "../../mocks/mockData";

/*
  Tela responsável pelo gerenciamento
  do horário de funcionamento.
*/

function BusinessHours() {

  // Lista dos horários cadastrados
  const [hoursList, setHoursList] =
    useState(businessHours);

  // Estados do formulário
  const [dia, setDia] = useState("");
  const [abertura, setAbertura] =
    useState("");

  const [fechamento, setFechamento] =
    useState("");

  /*
    Adiciona um novo horário.
  */
  function handleAddHour() {

    if (!dia || !abertura || !fechamento) {
      alert("Preencha todos os campos.");
      return;
    }

    const newHour = {
      id: Date.now(),
      dia,
      abertura,
      fechamento
    };

    setHoursList([
      ...hoursList,
      newHour
    ]);

    // Limpa os campos
    setDia("");
    setAbertura("");
    setFechamento("");
  }

  /*
    Remove um horário cadastrado.
  */
  function removeHour(id) {

    const updatedHours =
      hoursList.filter(
        (hour) => hour.id !== id
      );

    setHoursList(updatedHours);
  }

  return (
    <section>

      <Header
        title="Horário de Funcionamento"
        subtitle="Gerencie os horários da barbearia."
      />

      <div className="block-form">

        <select
          value={dia}
          onChange={(e) =>
            setDia(e.target.value)
          }
        >

          <option value="">
            Selecione o dia
          </option>

          <option>Segunda-feira</option>
          <option>Terça-feira</option>
          <option>Quarta-feira</option>
          <option>Quinta-feira</option>
          <option>Sexta-feira</option>
          <option>Sábado</option>

        </select>

        <input
          type="time"
          value={abertura}
          onChange={(e) =>
            setAbertura(e.target.value)
          }
        />

        <input
          type="time"
          value={fechamento}
          onChange={(e) =>
            setFechamento(e.target.value)
          }
        />

        <button onClick={handleAddHour}>
          Adicionar Horário
        </button>

      </div>

      <div className="appointments-list">

        {hoursList.map((hour) => (

          <div
            key={hour.id}
            className="appointment-card"
          >

            <h2>{hour.dia}</h2>

            <p>
              <strong>Abertura:</strong>
              {" "}
              {hour.abertura}
            </p>

            <p>
              <strong>Fechamento:</strong>
              {" "}
              {hour.fechamento}
            </p>

            <button
              onClick={() =>
                removeHour(hour.id)
              }
            >
              Remover Horário
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default BusinessHours;