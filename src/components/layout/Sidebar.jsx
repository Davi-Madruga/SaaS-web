import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const menus = {
  cliente: [
    { to: '/dashboard', label: 'Início' },
    { to: '/agendar', label: 'Novo agendamento' },
    { to: '/meus-agendamentos', label: 'Meus agendamentos' },
    { to: '/historico', label: 'Histórico' }
  ],
  barbeiro: [
    { to: '/dashboard', label: 'Início' },
    { to: '/agenda-barbeiro', label: 'Agenda' },
    { to: '/bloqueios', label: 'Bloqueios' },
    { to: '/meus-agendamentos', label: 'Agendamentos' }
  ],
  admin: [
    { to: '/dashboard', label: 'Início' },
    { to: '/servicos', label: 'Serviços e preços' },
    { to: '/barbeiros', label: 'Barbeiros' },
    { to: '/clientes', label: 'Clientes' },
    { to: '/horarios', label: 'Horário de funcionamento' },
    { to: '/agenda-barbeiro', label: 'Agenda geral' },
    { to: '/meus-agendamentos', label: 'Agendamentos' }
  ]
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = menus[user?.tipo] || menus.cliente;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">B</div>
        <div>
          <strong>Barbearia</strong>
          <span>Academy</span>
        </div>
      </div>

      <nav className="nav-menu">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="ghost-button" onClick={handleLogout}>
        Sair
      </button>
    </aside>
  );
}
