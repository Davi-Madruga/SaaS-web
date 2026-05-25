import { useEffect, useState } from 'react';
import { Alert } from '../components/Alert.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { getApiErrorMessage } from '../services/errorHandler.js';
import { agendamentosApi, servicosApi, usuariosApi } from '../services/api.js';

export function AppointmentsPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState({ barbeiro: '', servicos: [], data_hora: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() {
    const [agendamentosData, barbeirosData, servicosData] = await Promise.all([
      agendamentosApi.listar(),
      usuariosApi.listarBarbeiros(),
      servicosApi.listar()
    ]);

    setAgendamentos(agendamentosData);
    setBarbeiros(barbeirosData);
    setServicos(servicosData);
  }

  useEffect(() => {
    load().catch((err) => setError(getApiErrorMessage(err)));
  }, []);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function updateServico(event) {
    const value = Number(event.target.value);
    setForm((current) => ({ ...current, servicos: value ? [value] : [] }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await agendamentosApi.criar({
        ...form,
        barbeiro: Number(form.barbeiro),
        servicos: form.servicos.map(Number)
      });
      setForm({ barbeiro: '', servicos: [], data_hora: '' });
      setSuccess('Agendamento criado com sucesso.');
      await load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <>
      <PageHeader title="Agendamentos" description="Crie e acompanhe seus horários." />
      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      {barbeiros.length === 0 && (
        <Alert type="error">
          Nenhum barbeiro disponível para agendamento. Verifique se existem barbeiros cadastrados no backend e se VITE_USUARIOS_ENDPOINT está apontando para /api/usuario/ ou /api/usuarios/.
        </Alert>
      )}

      <form className="card form three-columns" onSubmit={submit}>
        <label>
          Barbeiro
          <select name="barbeiro" value={form.barbeiro} onChange={update} required>
            <option value="">Selecione</option>
            {barbeiros.map((barbeiro) => (
              <option value={barbeiro.id} key={barbeiro.id}>{barbeiro.nome}</option>
            ))}
          </select>
        </label>

        <label>
          Serviço
          <select value={form.servicos[0] || ''} onChange={updateServico} required>
            <option value="">Selecione</option>
            {servicos.map((servico) => (
              <option value={servico.id} key={servico.id}>{servico.nome}</option>
            ))}
          </select>
        </label>

        <label>
          Data e hora
          <input type="datetime-local" name="data_hora" value={form.data_hora} onChange={update} required />
        </label>

        <button className="primary-button full-row" type="submit">Agendar</button>
      </form>

      <div className="table-card section-space">
        {agendamentos.length ? (
          <table>
            <thead>
              <tr><th>ID</th><th>Cliente</th><th>Barbeiro</th><th>Data</th><th>Valor</th></tr>
            </thead>
            <tbody>
              {agendamentos.map((agendamento) => (
                <tr key={agendamento.id}>
                  <td>{agendamento.id}</td>
                  <td>{agendamento.cliente}</td>
                  <td>{agendamento.barbeiro}</td>
                  <td>{new Date(agendamento.data_hora).toLocaleString()}</td>
                  <td>{agendamento.valor_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <EmptyState title="Nenhum agendamento encontrado" />}
      </div>
    </>
  );
}
