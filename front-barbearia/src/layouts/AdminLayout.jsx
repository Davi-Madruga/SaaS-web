import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  const links = [
    {
      path: "/admin",
      label: "Dashboard"
    },
    
    {
      path: "/admin/funcionarios",
      label: "Funcionários"
    },
    
    {
      path: "/",
      label: "Sair"
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar title="Dono/Admin" links={links} />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;