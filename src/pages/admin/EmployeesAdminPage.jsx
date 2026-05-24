import { useEffect, useMemo, useState } from 'react';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { perfisService } from '../../services/api/perfisService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';

export function EmployeesAdminPage() {
  const [perfis, setPerfis] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const funcionarios = useMemo(() => perfis.filter((perfil) => perfil.tipo !== 'cliente'), [perfis]);

  function startEdit(perfil) {
    setEditing(perfil);
    setForm({ nome: perfil.nome || '', telefone: perfil.telefone || '' });
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await perfisService.atualizar(editing.id, form);
      setSuccess('Funcionário atualizado com sucesso.');
      setEditing(null);
      await loadPerfis();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader title="Funcionários" description="Liste e atualize dados dos perfis administrativos existentes." />
      <Alert>
        Nos fontes enviados, o backend possui cadastro apenas em /api/clientes/ e o PerfilSerializer permite alterar nome e telefone. Por isso, esta tela não cria barbeiro novo ainda.
      </Alert>
      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      {editing && (
        <form className="card form two-columns" onSubmit={handleSubmit}>
          <h2 className="full-row">Editar {editing.nome}</h2>
          <label>
            Nome
            <input name="nome" value={form.nome} onChange={updateField} required />
          </label>
          <label>
            Telefone
            <input name="telefone" value={form.telefone} onChange={updateField} required />
          </label>
          <button type="submit" className="primary-button">Salvar alterações</button>
          <button type="button" className="secondary-button" onClick={() => setEditing(null)}>Cancelar</button>
        </form>
      )}

      <div className="table-card">
        {funcionarios.length === 0 ? (
          <EmptyState title="Nenhum funcionário encontrado" description="Os perfis admin e barbeiro aparecerão aqui quando existirem no backend." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((perfil) => (
                <tr key={perfil.id}>
                  <td>{perfil.nome}</td>
                  <td>{perfil.email}</td>
                  <td>{perfil.telefone}</td>
                  <td>{perfil.tipo}</td>
                  <td>
                    <button type="button" className="secondary-button" onClick={() => startEdit(perfil)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
