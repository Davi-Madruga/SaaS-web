import { useEffect, useState } from 'react';
import { Alert } from '../../components/ui/Alert.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { servicosService } from '../../services/api/servicosService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';
import { formatCurrency } from '../../utils/formatters.js';

const initialForm = { nome: '', valor: '', duracao_minutos: '' };

export function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function loadServices() {
    try {
      const data = await servicosService.listar();
      setServices(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function startEdit(service) {
    setEditingId(service.id);
    setForm({
      nome: service.nome,
      valor: service.valor,
      duracao_minutos: service.duracao_minutos
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      nome: form.nome,
      valor: Number(form.valor),
      duracao_minutos: Number(form.duracao_minutos)
    };

    try {
      if (editingId) {
        await servicosService.atualizar(editingId, payload);
        setSuccess('Serviço atualizado com sucesso.');
      } else {
        await servicosService.criar(payload);
        setSuccess('Serviço criado com sucesso.');
      }

      resetForm();
      await loadServices();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  async function handleRemove(service) {
    setError('');
    setSuccess('');

    try {
      await servicosService.remover(service.id);
      setSuccess('Serviço removido com sucesso.');
      await loadServices();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader title="Serviços e preços" description="Gerencie valores, nomes e duração dos serviços." />
      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      <form className="card form three-columns" onSubmit={handleSubmit}>
        <label>
          Nome do serviço
          <input name="nome" value={form.nome} onChange={updateField} required />
        </label>
        <label>
          Valor
          <input name="valor" type="number" step="0.01" value={form.valor} onChange={updateField} required />
        </label>
        <label>
          Duração em minutos
          <input name="duracao_minutos" type="number" value={form.duracao_minutos} onChange={updateField} required />
        </label>
        <button type="submit" className="primary-button">
          {editingId ? 'Salvar alterações' : 'Cadastrar serviço'}
        </button>
        {editingId && <button type="button" className="secondary-button" onClick={resetForm}>Cancelar</button>}
      </form>

      <div className="table-card">
        {services.length === 0 ? (
          <EmptyState title="Nenhum serviço cadastrado" description="Cadastre o primeiro serviço usando o formulário acima." />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Valor</th>
                <th>Duração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.nome}</td>
                  <td>{formatCurrency(service.valor)}</td>
                  <td>{service.duracao_minutos} min</td>
                  <td className="row-actions">
                    <button type="button" className="secondary-button" onClick={() => startEdit(service)}>Editar</button>
                    <button type="button" className="danger-button" onClick={() => handleRemove(service)}>Remover</button>
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
