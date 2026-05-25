import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function DashboardPage() {
  const { user } = useAuth();
  const cards = [
    { title: 'Agendamentos', text: 'Visualize e gerencie horários.', to: '/agendamentos' },
    user?.tipo === 'admin' && { title: 'Barbeiros', text: 'Crie, detalhe e atualize barbeiros.', to: '/barbeiros' },
    user?.tipo === 'admin' && { title: 'Clientes', text: 'Liste, detalhe e atualize clientes.', to: '/clientes' },
    user?.tipo === 'admin' && { title: 'Serviços', text: 'Gerencie preços e duração.', to: '/servicos' }
  ].filter(Boolean);

  return (
    <>
      <PageHeader title={`Olá, ${user?.nome || 'usuário'}`} description="Escolha uma área para começar." />
      <div className="dashboard-grid">
        {cards.map((card) => <Link className="card action-card" to={card.to} key={card.to}><h2>{card.title}</h2><p>{card.text}</p></Link>)}
      </div>
    </>
  );
}
