import { useState } from "react";

import Header from "../../components/Header";

import {
  employees
} from "../../mocks/mockData";

/*
  Tela responsável pelo gerenciamento
  de funcionários da barbearia.
*/

function Employees() {

  // Lista de funcionários
  const [employeeList, setEmployeeList] =
    useState(employees);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");

  /*
    Adiciona um novo funcionário.
  */
  function handleAddEmployee() {

    if (!nome || !funcao) {
      alert("Preencha todos os campos.");
      return;
    }

    const newEmployee = {
      id: Date.now(),
      nome,
      funcao
    };

    setEmployeeList([
      ...employeeList,
      newEmployee
    ]);

    // Limpa os inputs
    setNome("");
    setFuncao("");
  }

  /*
    Remove um funcionário da lista.
  */
  function removeEmployee(id) {

    const updatedEmployees =
      employeeList.filter(
        (employee) => employee.id !== id
      );

    setEmployeeList(updatedEmployees);
  }

  return (
    <section>

      <Header
        title="Funcionários"
        subtitle="Gerencie os barbeiros cadastrados."
      />

      <div className="block-form">

        <input
          type="text"
          placeholder="Nome do funcionário"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Função"
          value={funcao}
          onChange={(e) =>
            setFuncao(e.target.value)
          }
        />

        <button onClick={handleAddEmployee}>
          Adicionar
        </button>

      </div>

      <div className="appointments-list">

        {employeeList.map((employee) => (

          <div
            key={employee.id}
            className="appointment-card"
          >

            <h2>{employee.nome}</h2>

            <p>
              <strong>Função:</strong>
              {" "}
              {employee.funcao}
            </p>

            <button
              onClick={() =>
                removeEmployee(employee.id)
              }
            >
              Remover Funcionário
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Employees;