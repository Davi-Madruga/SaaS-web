import { useEffect, useState } from 'react';
import { Alert } from '../components/Alert.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { getApiErrorMessage } from '../services/errorHandler.js';
import { usuariosApi } from '../services/api.js';

const initialCreateForm = { nome: '', telefone: '', email: '', password: '' };
const initialEditForm = { nome: '', telefone: '', email: '', password: '' };

export function BarbersPage() {
  const [barbeiros, setBarbeiros] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [editForm, setEditForm] = useState(initialEditForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() {
    setBarbeiros(await usuariosApi.listarBarbeiros());
  }

  useEffect(() => { load().catch((err) => setError(getApiErrorMessage(err))); }, []);

  function updateCreate(event) {
    setCreateForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function updateEdit(event) {
    setEditForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function createBarber(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await usuariosApi.criarBarbeiro(createForm);
      setCreateForm(initialCreateForm);
      setSuccess('Barbeiro criado com sucesso.');
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  async function openDetails(barbeiro) {
    setError('');

    try {
      const data = await usuariosApi.detalhar(barbeiro.id);
      setSelected(data);
      setEditing(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  function startEdit(barbeiro) {
    setSelected(barbeiro);
    setEditing(barbeiro);
    setEditForm({
      nome: barbeiro.nome || '',
      telefone: barbeiro.telefone || '',
      email: barbeiro.email || '',
      password: ''
    });
  }

  async function updateBarber(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updated = await usuariosApi.atualizar(editing.id, editForm);
      setSuccess('Barbeiro atualizado com sucesso.');
      setSelected(updated);
      setEditing(null);
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader title="Gerenciar barbeiros" description="Crie, liste, detalhe e atualize os barbeiros." />
      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      <form className="card form two-columns" onSubmit={createBarber}>
        <h2 className="full-row">Criar barbeiro</h2>
        <label>Nome<input name="nome" value={createForm.nome} onChange={updateCreate} required /></label>
        <label>Telefone<input name="telefone" value={createForm.telefone} onChange={updateCreate} required /></label>
        <label>Email<input name="email" type="email" value={createForm.email} onChange={updateCreate} required /></label>
        <label>Senha<input name="password" type="password" value={createForm.password} onChange={updateCreate} required /></label>
        <button className="primary-button full-row" type="submit">Criar barbeiro</button>
      </form>

      {editing && (
        <form className="card form two-columns section-space" onSubmit={updateBarber}>
          <h2 className="full-row">Atualizar barbeiro</h2>
          <label>Nome<input name="nome" value={editForm.nome} onChange={updateEdit} required /></label>
          <label>Telefone<input name="telefone" value={editForm.telefone} onChange={updateEdit} required /></label>
          <label>Email<input name="email" type="email" value={editForm.email} onChange={updateEdit} required /></label>
          <label>Nova senha<input name="password" type="password" value={editForm.password} onChange={updateEdit} placeholder="Deixe vazio para manter" /></label>
          <button className="primary-button" type="submit">Salvar</button>
          <button className="secondary-button" type="button" onClick={() => setEditing(null)}>Cancelar</button>
        </form>
      )}

      <div className="admin-grid section-space">
        <div className="table-card">
          {barbeiros.length === 0 ? <EmptyState title="Nenhum barbeiro encontrado" /> : (
            <table>
              <thead><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Ações</th></tr></thead>
              <tbody>
                {barbeiros.map((barbeiro) => (
                  <tr key={barbeiro.id}>
                    <td>{barbeiro.nome}</td>
                    <td>{barbeiro.email}</td>
                    <td>{barbeiro.telefone}</td>
                    <td className="row-actions">
                      <button className="secondary-button" onClick={() => openDetails(barbeiro)}>Detalhar</button>
                      <button className="secondary-button" onClick={() => startEdit(barbeiro)}>Atualizar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <aside className="card detail-card">
          <h2>Detalhes do barbeiro</h2>
          {selected ? (
            <div className="detail-list">
              <span>ID <strong>{selected.id}</strong></span>
              <span>Nome <strong>{selected.nome}</strong></span>
              <span>Email <strong>{selected.email}</strong></span>
              <span>Telefone <strong>{selected.telefone}</strong></span>
              <span>Tipo <strong>{selected.tipo}</strong></span>
            </div>
          ) : <p>Selecione um barbeiro.</p>}
        </aside>
      </div>
    </>
  );
}
