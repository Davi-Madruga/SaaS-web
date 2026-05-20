import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ClientLayout from "../layouts/ClientLayout";
import ClientHome from "../pages/client/ClientHome";
import NewAppointment from "../pages/client/NewAppointment";
import BarberLayout from "../layouts/BarberLayout";
import BarberDashboard from "../pages/barber/BarberDashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MyAppointments from "../pages/client/MyAppointments";
import AppointmentHistory from "../pages/client/AppointmentHistory";
import BlockedSchedules from "../pages/barber/BlockedSchedules";
import Employees from "../pages/admin/Employees";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/cliente" element={<ClientLayout />}>
          <Route index element={<ClientHome />} />
          <Route path="agendar" element={<NewAppointment />} />
          <Route path="meus-agendamentos" element={<MyAppointments />} />
          <Route path="agendamentos" element={<MyAppointments />} />
           <Route path="historico" element={<AppointmentHistory />} />
        </Route>

        <Route path="/barbeiro" element={<BarberLayout />}>
          <Route index element={<BarberDashboard />} />
          <Route path="bloqueios" element={<BlockedSchedules />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="funcionarios" element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;