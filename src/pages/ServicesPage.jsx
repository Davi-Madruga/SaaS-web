import { useEffect, useState } from 'react';
import { Alert } from '../components/Alert.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { getApiErrorMessage } from '../services/errorHandler.js';
import { servicosApi } from '../services/api.js';

export function ServicesPage() {
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState({ nome: '', valor: '', duracao_minutos: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() { setServicos(await servicosApi.listar()); }
  useEffect(() => { load().catch((err) => setError(getApiErrorMessage(err))); }, []);
  function updateField(e) { setForm((c) => ({ ...c, [e.target.name]: e.target.value })); }
  async function submit(e) { e.preventDefault(); setError(''); setSuccess(''); try { await servicosApi.criar(form); setForm({ nome: '', valor: '', duracao_minutos: '' }); setSuccess('Serviço criado.'); await load(); } catch (err) { setError(getApiErrorMessage(err)); } }
  return <><PageHeader title="Serviços" description="Gerencie os valores dos serviços." /><Alert type="error">{error}</Alert><Alert type="success">{success}</Alert><form className="card form three-columns" onSubmit={submit}><label>Nome<input name="nome" value={form.nome} onChange={updateField} required /></label><label>Valor<input name="valor" value={form.valor} onChange={updateField} required /></label><label>Duração<input name="duracao_minutos" value={form.duracao_minutos} onChange={updateField} required /></label><button className="primary-button full-row">Criar serviço</button></form><div className="table-card section-space">{servicos.length ? <table><thead><tr><th>Nome</th><th>Valor</th><th>Duração</th></tr></thead><tbody>{servicos.map((s) => <tr key={s.id}><td>{s.nome}</td><td>R$ {s.valor}</td><td>{s.duracao_minutos} min</td></tr>)}</tbody></table> : <EmptyState title="Nenhum serviço encontrado" />}</div></>;
}
