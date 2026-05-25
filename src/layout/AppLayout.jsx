import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const isAdmin = user?.tipo === 'admin';
  const isBarbeiro = user?.tipo === 'barbeiro';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/dashboard" className="brand">BA</Link>
        <nav>
          <NavLink to="/dashboard">Início</NavLink>
          <NavLink to="/agendamentos">Agendamentos</NavLink>
          {isAdmin && <NavLink to="/servicos">Serviços</NavLink>}
          {isAdmin && <NavLink to="/barbeiros">Barbeiros</NavLink>}
          {isAdmin && <NavLink to="/clientes">Clientes</NavLink>}
          {(isAdmin || isBarbeiro) && <NavLink to="/bloqueios">Bloqueios</NavLink>}
        </nav>
        <button className="ghost-button" onClick={handleLogout}>Sair</button>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <span>{user?.nome}</span>
          <strong>{user?.tipo}</strong>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
