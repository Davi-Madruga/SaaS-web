import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function BarberLayout() {
  const links = [
    {
      path: "/barbeiro",
      label: "Dashboard"
    },
      {
        path: "/barbeiro/bloqueios",
        label: "Bloqueios"
      },
    {
      path: "/",
      label: "Sair"
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar title="Barbeiro" links={links} />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default BarberLayout;