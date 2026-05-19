/*
  Card reutilizável.
  Está sendo usado para barbeiros,
  horários e serviços.
*/

function ServiceCard({
  title,
  subtitle,
  selected,
  onClick
}) {
  return (
    <button
      className={selected ? "card selected" : "card"}
      onClick={onClick}
    >
      <strong>{title}</strong>

      <span>{subtitle}</span>
    </button>
  );
}

export default ServiceCard;