import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';

const initialForm = {
  nome: '',
  telefone: '',
  email: '',
  password: ''
};

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await register(form);
      setSuccess('Cadastro realizado com sucesso. Agora você já pode fazer login.');
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
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

        <form onSubmit={handleSubmit} className="form two-columns">
          <label>
            Nome
            <input name="nome" value={form.nome} onChange={updateField} required />
          </label>
          <label>
            Telefone
            <input name="telefone" value={form.telefone} onChange={updateField} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required />
          </label>
          <label>
            Senha
            <input name="password" type="password" value={form.password} onChange={updateField} required />
          </label>
          <button type="submit" className="primary-button full-row" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
