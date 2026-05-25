import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getApiErrorMessage } from '../services/errorHandler.js';

export function RegisterPage() {
  const { registerClient } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerClient(form);
      setSuccess('Conta criada com sucesso. Faça login para continuar.');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card wide">
        <div className="auth-intro">
          <span>Barbearia Academy</span>
          <h1>Criar conta</h1>
        </div>
        <Alert type="error">{error}</Alert>
        <Alert type="success">{success}</Alert>
        <form className="form two-columns" onSubmit={handleSubmit}>
          <label>Nome<input name="nome" value={form.nome} onChange={updateField} required /></label>
          <label>Telefone<input name="telefone" value={form.telefone} onChange={updateField} required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
          <label>Senha<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
          <button className="primary-button full-row" type="submit">Criar conta</button>
        </form>
        <p className="auth-footer">Já tem conta? <Link to="/login">Entrar</Link></p>
      </section>
    </main>
  );
}
