import { useState } from "react";

import Header from "../../components/Header";

import {
  services
} from "../../mocks/mockData";

/*
  Tela responsável pelo gerenciamento
  dos preços dos serviços.
*/

function ServicePrices() {

  // Lista de serviços cadastrados
  const [serviceList, setServiceList] =
    useState(services);

  // Estados dos inputs
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  /*
    Adiciona um novo serviço.
  */
  function handleAddService() {

    if (!nome || !preco) {
      alert("Preencha todos os campos.");
      return;
    }

    const newService = {
      id: Date.now(),
      nome,
      preco: Number(preco)
    };

    setServiceList([
      ...serviceList,
      newService
    ]);

    // Limpa os campos
    setNome("");
    setPreco("");
  }

  /*
    Remove um serviço da lista.
  */
  function removeService(id) {

    const updatedServices =
      serviceList.filter(
        (service) => service.id !== id
      );

    setServiceList(updatedServices);
  }

  return (
    <section>

      <Header
        title="Serviços"
        subtitle="Gerencie os valores da barbearia."
      />

      <div className="block-form">

        <input
          type="text"
          placeholder="Nome do serviço"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) =>
            setPreco(e.target.value)
          }
        />

        <button onClick={handleAddService}>
          Adicionar Serviço
        </button>

      </div>

      <div className="appointments-list">

        {serviceList.map((service) => (

          <div
            key={service.id}
            className="appointment-card"
          >

            <h2>{service.nome}</h2>

            <p>
              <strong>Preço:</strong>
              {" "}
              R$ {service.preco.toFixed(2)}
            </p>

            <button
              onClick={() =>
                removeService(service.id)
              }
            >
              Remover Serviço
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default ServicePrices;