import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getApiErrorMessage } from '../services/errorHandler.js';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-intro">
          <span>Barbearia Academy</span>
          <h1>Acesse sua conta</h1>
        </div>
        <Alert type="error">{error}</Alert>
        <form className="form" onSubmit={handleSubmit}>
          <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
          <label>Senha<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
          <button className="primary-button" type="submit">Entrar</button>
        </form>
        <p className="auth-footer">Ainda não tem conta? <Link to="/cadastro">Criar conta</Link></p>
      </section>
    </main>
  );
}
