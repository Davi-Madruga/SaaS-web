import { useEffect, useState } from 'react';
import { Alert } from '../components/Alert.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { getApiErrorMessage } from '../services/errorHandler.js';
import { usuariosApi } from '../services/api.js';

const initialEditForm = { nome: '', telefone: '', email: '', password: '' };

export function ClientsPage() {
  const [clientes, setClientes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialEditForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() {
    setClientes(await usuariosApi.listarClientes());
  }

  useEffect(() => { load().catch((err) => setError(getApiErrorMessage(err))); }, []);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function openDetails(cliente) {
    try {
      setSelected(await usuariosApi.detalhar(cliente.id));
      setEditing(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  function startEdit(cliente) {
    setSelected(cliente);
    setEditing(cliente);
    setForm({
      nome: cliente.nome || '',
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      password: ''
    });
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updated = await usuariosApi.atualizar(editing.id, form);
      setSuccess('Cliente atualizado com sucesso.');
      setSelected(updated);
      setEditing(null);
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader title="Clientes" description="Liste, detalhe e atualize os dados dos clientes." />
      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      {editing && (
        <form className="card form two-columns" onSubmit={submit}>
          <h2 className="full-row">Atualizar cliente</h2>
          <label>Nome<input name="nome" value={form.nome} onChange={updateField} required /></label>
          <label>Telefone<input name="telefone" value={form.telefone} onChange={updateField} required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
          <label>Nova senha<input name="password" type="password" value={form.password} onChange={updateField} placeholder="Deixe vazio para manter" /></label>
          <button className="primary-button" type="submit">Salvar</button>
          <button className="secondary-button" type="button" onClick={() => setEditing(null)}>Cancelar</button>
        </form>
      )}

      <div className="admin-grid section-space">
        <div className="table-card">
          {clientes.length === 0 ? <EmptyState title="Nenhum cliente encontrado" /> : (
            <table>
              <thead><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Ações</th></tr></thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td className="row-actions">
                      <button className="secondary-button" onClick={() => openDetails(cliente)}>Detalhar</button>
                      <button className="secondary-button" onClick={() => startEdit(cliente)}>Atualizar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <aside className="card detail-card">
          <h2>Detalhes do cliente</h2>
          {selected ? (
            <div className="detail-list">
              <span>ID <strong>{selected.id}</strong></span>
              <span>Nome <strong>{selected.nome}</strong></span>
              <span>Email <strong>{selected.email}</strong></span>
              <span>Telefone <strong>{selected.telefone}</strong></span>
              <span>Tipo <strong>{selected.tipo}</strong></span>
            </div>
          ) : <p>Selecione um cliente.</p>}
        </aside>
      </div>
    </>
  );
}
