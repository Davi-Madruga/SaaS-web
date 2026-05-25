import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { ServiceCard } from '../../components/cards/ServiceCard.jsx';
import { servicosService } from '../../services/api/servicosService.js';
import { perfisService } from '../../services/api/perfisService.js';
import { agendamentosService } from '../../services/api/agendamentosService.js';
import { getApiErrorMessage } from '../../services/api/errorHandler.js';
import { formatCurrency } from '../../utils/formatters.js';

export function NewAppointmentPage() {
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [barbeiro, setBarbeiro] = useState('');
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [dataHora, setDataHora] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setError('');
      try {
        const [barbeirosData, servicosData] = await Promise.all([
          perfisService.listarBarbeiros(),
          servicosService.listar()
        ]);
        setBarbeiros(barbeirosData);
        setServicos(servicosData);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const total = useMemo(() => {
    return servicos
      .filter((servico) => servicosSelecionados.includes(servico.id))
      .reduce((acc, servico) => acc + Number(servico.valor || 0), 0);
  }, [servicos, servicosSelecionados]);

  function toggleServico(id) {
    setServicosSelecionados((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!barbeiro || !dataHora || servicosSelecionados.length === 0) {
      setError('Escolha barbeiro, serviço e horário antes de confirmar.');
      return;
    }

    setIsSubmitting(true);

    try {
      await agendamentosService.criar({
        barbeiro: Number(barbeiro),
        servicos: servicosSelecionados,
        data_hora: dataHora
      });

      setSuccess('Agendamento realizado com sucesso.');
      setBarbeiro('');
      setServicosSelecionados([]);
      setDataHora('');
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Realizar agendamento"
        description="Escolha barbeiro, serviços e horário. O total aparece antes da confirmação."
      />

      <Alert type="error">{error}</Alert>
      <Alert type="success">{success}</Alert>

      <form onSubmit={handleSubmit} className="card form appointment-form">
        <label>
          Barbeiro
          <select value={barbeiro} onChange={(event) => setBarbeiro(event.target.value)} disabled={isLoading}>
            <option value="">Selecione</option>
            {barbeiros.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome} {item.email ? `- ${item.email}` : ''}
              </option>
            ))}
          </select>
        </label>

        <label>
          Data e horário
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(event) => setDataHora(event.target.value)}
            required
          />
        </label>

        <div className="full-row">
          <strong>Serviços</strong>
          <div className="services-grid">
            {servicos.map((servico) => (
              <ServiceCard
                key={servico.id}
                service={servico}
                selected={servicosSelecionados.includes(servico.id)}
                onToggle={toggleServico}
              />
            ))}
          </div>
        </div>

        <div className="total-box full-row">
          <span>Valor total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>

        <button type="submit" className="primary-button full-row" disabled={isSubmitting}>
          {isSubmitting ? 'Confirmando...' : 'Confirmar agendamento'}
        </button>
      </form>
    </>
  );
}
