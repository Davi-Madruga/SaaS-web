import Header from "../../components/Header";

/*
  Tela inicial do cliente.
*/

function ClientHome() {
  return (
    <section>

      <Header
        title="Área do Cliente"
        subtitle="Gerencie seus agendamentos de forma rápida."
      />

      <div className="welcome-card">
        <h2>Bem-vindo ao sistema da barbearia</h2>

        <p>
          Aqui você pode realizar agendamentos,
          consultar horários e acompanhar seus serviços.
        </p>
      </div>

    </section>
  );
}

export default ClientHome;