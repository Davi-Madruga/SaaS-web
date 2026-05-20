import Header from "../../components/Header";

/*
  Dashboard principal do administrador.
*/

function AdminDashboard() {
  return (
    <section>

      <Header
        title="Painel Administrativo"
        subtitle="Gerencie as configurações da barbearia."
      />

      <div className="welcome-card">

        <h2>Área administrativa</h2>

        <p>
          Aqui o dono pode controlar funcionários,
          horários e valores dos serviços.
        </p>

      </div>

    </section>
  );
}

export default AdminDashboard;