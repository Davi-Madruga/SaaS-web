export function Loading({ message = 'Carregando...' }) {
  return (
    <div className="center-screen">
      <div className="loader" />
      <p>{message}</p>
    </div>
  );
}
