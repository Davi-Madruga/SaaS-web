import { useEffect, useMemo, useState } from 'react';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { perfisService } from '../../services/api/perfisService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';

const initialCreateForm = {
  nome: '',
  telefone: '',
  email: '',
  password: ''
};

const initialEditForm = {
  nome: '',
  telefone: '',
  email: '',
  password: ''
};

function getUsuarioId(perfil) {
  return perfil?.usuario_id || perfil?.user_id || perfil?.usuario || perfil?.id;
}

function normalizeUpdatedBarbeiro(updated, previous) {
  return {
    id: updated.perfil_id || previous.id,
    usuario_id: updated.id || previous.usuario_id || previous.user_id,
    nome: updated.nome ?? previous.nome,
    telefone: updated.telefone ?? previous.telefone,
    email: updated.email ?? previous.email,
    tipo: updated.tipo ?? previous.tipo
  };
}

export function EmployeesAdminPage() {
  const [perfis, setPerfis] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(initialEditForm);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreating, setIsCreating] = useState(false);
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

  const barbeiros = useMemo(() => perfis.filter((perfil) => perfil.tipo === 'barbeiro'), [perfis]);

  function updateCreateField(event) {
    setCreateForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function updateEditField(event) {
    setEditForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleCreate(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsCreating(true);

    try {
      await perfisService.criarBarbeiro(createForm);
      setCreateForm(initialCreateForm);
      setSuccess('Barbeiro criado com sucesso.');
      await loadPerfis();
    } catch (err) {
      if ([404, 405].includes(err?.response?.status)) {
        setError('Não foi possível criar o barbeiro. Verifique se o backend expõe /api/usuario/ ou /api/usuarios/ e se a variável VITE_USUARIOS_ENDPOINT está configurada corretamente.');
      } else {
        setError(getApiErrorMessage(err));
      }
    } finally {
      setIsCreating(false);
    }
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
    setEditForm({
      nome: perfil.nome || '',
      telefone: perfil.telefone || '',
      email: perfil.email || '',
      password: ''
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const usuarioId = getUsuarioId(editing);
      const updated = await perfisService.atualizarUsuario(usuarioId, editForm);
      const normalized = normalizeUpdatedBarbeiro(updated, editing);
      setSuccess('Barbeiro atualizado com sucesso.');
      setEditing(null);
      setSelected(normalized);
      await loadPerfis();
    } catch (err) {
      if ([404, 405].includes(err?.response?.status)) {
        setError('Não foi possível atualizar o usuário. Verifique se o backend possui o endpoint /api/usuario/{id}/ ou /api/usuarios/{id}/ e se VITE_USUARIOS_ENDPOINT está correto.');
      } else {
        setError(getApiErrorMessage(err));
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Gerenciar barbeiros"
        description="Cadastre barbeiros, visualize detalhes e atualize dados de acesso e contato."
      />

      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      <form className="card form two-columns" onSubmit={handleCreate}>
        <h2 className="full-row">Criar barbeiro</h2>
        <label>
          Nome
          <input name="nome" value={createForm.nome} onChange={updateCreateField} required />
        </label>
        <label>
          Telefone
          <input name="telefone" value={createForm.telefone} onChange={updateCreateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={createForm.email} onChange={updateCreateField} required />
        </label>
        <label>
          Senha
          <input name="password" type="password" value={createForm.password} onChange={updateCreateField} required />
        </label>
        <button type="submit" className="primary-button full-row" disabled={isCreating}>
          {isCreating ? 'Criando barbeiro...' : 'Criar barbeiro'}
        </button>
      </form>

      {editing && (
        <form className="card form two-columns section-space" onSubmit={handleUpdate}>
          <h2 className="full-row">Atualizar barbeiro</h2>
          <label>
            Nome
            <input name="nome" value={editForm.nome} onChange={updateEditField} required />
          </label>
          <label>
            Telefone
            <input name="telefone" value={editForm.telefone} onChange={updateEditField} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={editForm.email} onChange={updateEditField} required />
          </label>
          <label>
            Senha
            <input
              name="password"
              type="password"
              value={editForm.password}
              onChange={updateEditField}
              placeholder="Deixe vazio para manter a senha atual"
            />
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
          {barbeiros.length === 0 ? (
            <EmptyState title="Nenhum barbeiro encontrado" description="Os barbeiros cadastrados aparecerão aqui." />
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
                {barbeiros.map((perfil) => (
                  <tr key={perfil.id}>
                    <td>{perfil.nome}</td>
                    <td>{perfil.email}</td>
                    <td>{perfil.telefone}</td>
                    <td>
                      <div className="row-actions">
                        <button type="button" className="secondary-button" onClick={() => openDetails(perfil)}>
                          Detalhar
                        </button>
                        <button type="button" className="secondary-button" onClick={() => startEdit(perfil)}>
                          Atualizar
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
          <h2>Detalhes do barbeiro</h2>
          {selected ? (
            <div className="detail-list">
              <span>ID do perfil <strong>{selected.id}</strong></span>
              <span>ID do usuário <strong>{selected.usuario_id || selected.user_id || 'Não informado'}</strong></span>
              <span>Nome <strong>{selected.nome}</strong></span>
              <span>Email <strong>{selected.email || 'Não informado'}</strong></span>
              <span>Telefone <strong>{selected.telefone || 'Não informado'}</strong></span>
              <span>Tipo <strong>{selected.tipo}</strong></span>
            </div>
          ) : (
            <p className="muted-text">Selecione um barbeiro para visualizar os detalhes.</p>
          )}
        </aside>
      </div>
    </>
  );
}
