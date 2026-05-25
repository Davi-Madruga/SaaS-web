import { useAuth } from '../../context/AuthContext.jsx';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div>
        <strong>Barbearia Academy</strong>
        <span>Sistema de agendamentos</span>
      </div>
      <div className="user-pill">
        <span>{user?.nome || user?.email || 'Usuário'}</span>
        <strong>{user?.tipo || 'perfil'}</strong>
      </div>
    </header>
  );
}
