import { useState } from 'react';
import { Alert } from '../../components/ui/Alert.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';

export function BarberBlocksPage() {
  const [blocks, setBlocks] = useState([]);
  const [form, setForm] = useState({ inicio: '', fim: '', motivo: '' });

  function handleSubmit(event) {
    event.preventDefault();
    setBlocks((current) => [...current, { ...form, id: crypto.randomUUID() }]);
    setForm({ inicio: '', fim: '', motivo: '' });
  }

  return (
    <>
      <PageHeader
        title="Bloqueios de agenda"
        description="Tela preparada para RF07. No backend atual, conecte esta tela quando existir endpoint de bloqueios."
      />

      <Alert>
        Esta tela está em modo visual/local porque os fontes de backend usados como referência não possuem endpoint de bloqueios de agenda.
      </Alert>

      <form className="card form two-columns" onSubmit={handleSubmit}>
        <label>
          Início
          <input
            type="datetime-local"
            value={form.inicio}
            onChange={(event) => setForm((current) => ({ ...current, inicio: event.target.value }))}
            required
          />
        </label>
        <label>
          Fim
          <input
            type="datetime-local"
            value={form.fim}
            onChange={(event) => setForm((current) => ({ ...current, fim: event.target.value }))}
            required
          />
        </label>
        <label className="full-row">
          Motivo
          <input
            value={form.motivo}
            onChange={(event) => setForm((current) => ({ ...current, motivo: event.target.value }))}
            placeholder="Ex.: almoço, compromisso, manutenção"
          />
        </label>
        <button className="primary-button" type="submit">Adicionar bloqueio local</button>
      </form>

      <div className="list-stack">
        {blocks.map((block) => (
          <article key={block.id} className="card">
            <strong>{block.motivo || 'Bloqueio'}</strong>
            <p>{block.inicio} até {block.fim}</p>
          </article>
        ))}
      </div>
    </>
  );
}
