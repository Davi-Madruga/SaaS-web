import { Link } from "react-router-dom";

/*
  Sidebar usada nos layouts do sistema.
  Os links mudam dependendo do tipo de usuário.
*/

function Sidebar({ title, links }) {
  return (
    <aside className="sidebar">
      <h2>{title}</h2>

      {links.map((link) => (
        <Link key={link.path} to={link.path}>
          {link.label}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;