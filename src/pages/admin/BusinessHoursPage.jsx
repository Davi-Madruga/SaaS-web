import { useState } from 'react';
import { Alert } from '../../components/ui/Alert.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';

const days = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];

export function BusinessHoursPage() {
  const [hours, setHours] = useState(
    days.map((day) => ({ day, abertura: '08:00', fechamento: '18:00', ativo: day !== 'Domingo' }))
  );

  function updateHour(index, field, value) {
    setHours((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    );
  }

  return (
    <>
      <PageHeader
        title="Horário de funcionamento"
        
      />


      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Aberto?</th>
              <th>Abertura</th>
              <th>Fechamento</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((item, index) => (
              <tr key={item.day}>
                <td>{item.day}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.ativo}
                    onChange={(event) => updateHour(index, 'ativo', event.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={item.abertura}
                    disabled={!item.ativo}
                    onChange={(event) => updateHour(index, 'abertura', event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={item.fechamento}
                    disabled={!item.ativo}
                    onChange={(event) => updateHour(index, 'fechamento', event.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
