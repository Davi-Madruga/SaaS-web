import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ClientLayout() {
  const links = [
    {
      path: "/cliente",
      label: "Início"
    },

    {
      path: "/cliente/agendar",
      label: "Novo Agendamento"
    },

    {
      path: "/cliente/agendamentos",
      label: "Meus Agendamentos"
    },

    {
      path: "/cliente/historico",
      label: "Histórico"
    },
    
    {
      path: "/",
      label: "Sair"
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar title="Cliente" links={links} />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;