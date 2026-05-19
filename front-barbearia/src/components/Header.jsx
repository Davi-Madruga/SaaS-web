/*
  Header principal das páginas.
  Recebe título e descrição.
*/

function Header({ title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>
    </header>
  );
}

export default Header;