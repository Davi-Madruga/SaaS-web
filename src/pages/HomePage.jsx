import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-copy">
          <div className="home-logo" aria-label="Logo Barbearia Academy">
            <span className="home-logo-mark">BA</span>
            <span className="home-logo-cut" />
          </div>

          <span className="home-eyebrow">Barbearia Academy</span>
          <h1>Agende seu corte com praticidade e estilo.</h1>
          <p>
            Uma experiência simples para clientes, barbeiros e administradores organizarem
            horários, serviços e atendimentos em poucos cliques.
          </p>

          <div className="home-actions">
            <Link className="primary-button" to="/login">
              Entrar no sistema
            </Link>
            <Link className="secondary-button" to="/cadastro">
              Criar cadastro
            </Link>
          </div>
        </div>

        <div className="home-panel" aria-hidden="true">
          <div className="home-card floating-card card-one">
            <strong>Agenda online</strong>
            <span>Escolha barbeiro, data e horário.</span>
          </div>
          <div className="home-card floating-card card-two">
            <strong>Preços claros</strong>
            <span>Veja o total antes de confirmar.</span>
          </div>
          <div className="home-card floating-card card-three">
            <strong>Gestão completa</strong>
            <span>Serviços, funcionários e horários.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
