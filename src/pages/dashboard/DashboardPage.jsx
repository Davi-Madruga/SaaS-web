import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const cardsByRole = {
  cliente: [
    { title: 'Realizar agendamento', text: 'Escolha barbeiro, serviços, data e horário.', to: '/agendar' },
    { title: 'Visualizar agendamentos', text: 'Veja seus horários marcados e cancele quando permitido.', to: '/meus-agendamentos' },
    { title: 'Histórico', text: 'Consulte atendimentos anteriores.', to: '/historico' }
  ],
  barbeiro: [
    { title: 'Agenda do barbeiro', text: 'Veja e edite os agendamentos vinculados a você.', to: '/agenda-barbeiro' },
    { title: 'Bloqueios de agenda', text: 'Reserve horários indisponíveis para clientes.', to: '/bloqueios' }
  ],
  admin: [
    { title: 'Gerenciar barbeiros', text: 'Cadastre, detalhe e atualize barbeiros.', to: '/barbeiros' },
    { title: 'Clientes', text: 'Liste, detalhe e atualize clientes.', to: '/clientes' },
    { title: 'Gerenciar serviços', text: 'Cadastre serviços, valores e duração.', to: '/servicos' },
    { title: 'Horário de funcionamento', text: 'Defina abertura e fechamento da barbearia.', to: '/horarios' },
    { title: 'Agenda geral', text: 'Acompanhe todos os agendamentos.', to: '/agenda-barbeiro' }
  ]
};

export function DashboardPage() {
  const { user } = useAuth();
  const cards = cardsByRole[user?.tipo] || cardsByRole.cliente;

  return (
    <>
      <PageHeader
        title={`Olá, ${user?.nome || 'usuário'}!`}
        description="Escolha uma das opções abaixo para continuar."
      />

      <div className="dashboard-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="card action-card">
            <span>{card.title}</span>
            <p>{card.text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
