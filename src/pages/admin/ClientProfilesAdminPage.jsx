import { useEffect, useMemo, useState } from 'react';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { perfisService } from '../../services/api/perfisService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';

export function ClientProfilesAdminPage() {
  const [perfis, setPerfis] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function loadPerfis() {
    try {
      const data = await perfisService.listar();
      setPerfis(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  useEffect(() => {
    loadPerfis();
  }, []);

  const clientes = useMemo(() => perfis.filter((perfil) => perfil.tipo === 'cliente'), [perfis]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function openDetails(perfil) {
    setError('');
    setSuccess('');

    try {
      const data = await perfisService.detalhar(perfil.id);
      setSelected(data);
      setEditing(null);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  function startEdit(perfil) {
    setSelected(perfil);
    setEditing(perfil);
    setForm({ nome: perfil.nome || '', telefone: perfil.telefone || '' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const updated = await perfisService.atualizar(editing.id, form);
      setSuccess('Perfil do cliente atualizado com sucesso.');
      setEditing(null);
      setSelected(updated);
      await loadPerfis();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Clientes"
        
      />

      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      {editing && (
        <form className="card form two-columns" onSubmit={handleSubmit}>
          <h2 className="full-row">Atualizar perfil do cliente</h2>
          <label>
            Nome
            <input name="nome" value={form.nome} onChange={updateField} required />
          </label>
          <label>
            Telefone
            <input name="telefone" value={form.telefone} onChange={updateField} required />
          </label>
          <button type="submit" className="primary-button" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <button type="button" className="secondary-button" onClick={() => setEditing(null)}>
            Cancelar
          </button>
        </form>
      )}

      <div className="admin-grid section-space">
        <div className="table-card">
          {clientes.length === 0 ? (
            <EmptyState title="Nenhum cliente encontrado" description="Os clientes cadastrados aparecerão aqui." />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((perfil) => (
                  <tr key={perfil.id}>
                    <td>{perfil.nome}</td>
                    <td>{perfil.email}</td>
                    <td>{perfil.telefone}</td>
                    <td>
                      <div className="row-actions">
                        <button type="button" className="secondary-button" onClick={() => openDetails(perfil)}>
                          Detalhar
                        </button>
                        
                      </div>
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
              <span>Email <strong>{selected.email || 'Não informado'}</strong></span>
              <span>Telefone <strong>{selected.telefone || 'Não informado'}</strong></span>
              <span>Tipo <strong>{selected.tipo}</strong></span>
            </div>
          ) : (
            <p className="muted-text">Selecione um cliente para visualizar os detalhes.</p>
          )}
        </aside>
      </div>
    </>
  );
}
