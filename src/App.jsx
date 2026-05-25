import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import { LoginPage } from './pages/auth/LoginPage.jsx';
import { RegisterPage } from './pages/auth/RegisterPage.jsx';
import { DashboardPage } from './pages/dashboard/DashboardPage.jsx';
import { NewAppointmentPage } from './pages/client/NewAppointmentPage.jsx';
import { MyAppointmentsPage } from './pages/client/MyAppointmentsPage.jsx';
import { HistoryPage } from './pages/client/HistoryPage.jsx';
import { BarberSchedulePage } from './pages/barber/BarberSchedulePage.jsx';
import { BarberBlocksPage } from './pages/barber/BarberBlocksPage.jsx';
import { ServicesAdminPage } from './pages/admin/ServicesAdminPage.jsx';
import { EmployeesAdminPage } from './pages/admin/EmployeesAdminPage.jsx';
import { ClientProfilesAdminPage } from './pages/admin/ClientProfilesAdminPage.jsx';
import { BusinessHoursPage } from './pages/admin/BusinessHoursPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { HomePage } from './pages/HomePage.jsx';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />

        <Route
          path="agendar"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <NewAppointmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="meus-agendamentos"
          element={
            <ProtectedRoute allowedRoles={["cliente", "admin", "barbeiro"]}>
              <MyAppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="historico"
          element={
            <ProtectedRoute allowedRoles={["cliente", "admin"]}>
              <HistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="agenda-barbeiro"
          element={
            <ProtectedRoute allowedRoles={["barbeiro", "admin"]}>
              <BarberSchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bloqueios"
          element={
            <ProtectedRoute allowedRoles={["barbeiro", "admin"]}>
              <BarberBlocksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="servicos"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ServicesAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="barbeiros"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EmployeesAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="clientes"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ClientProfilesAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="horarios"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BusinessHoursPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
