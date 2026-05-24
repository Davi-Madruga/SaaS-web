import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="center-screen">
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe no sistema.</p>
      <Link className="primary-button" to="/dashboard">Voltar ao início</Link>
    </main>
  );
}
