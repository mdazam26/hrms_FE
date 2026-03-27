import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import SuperAdmin from "./pages/SuperAdmin";
import Profile from "./pages/Profile";
import Header from "./components/Header";   
import EmployeeDetails from "./pages/EmployeeDetails";
import { canManageEmployees, canUseProfileApi } from "./auth/roles";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading session...</div>;

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        {canManageEmployees(user.role) && (
          <>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/create" element={<CreateEmployee />} />
          </>
        )}

        {user.role === "SUPER_ADMIN" && (
          <Route path="/super-admin" element={<SuperAdmin />} />
        )}

        {canUseProfileApi(user.role) && (
          <Route path="/profile" element={<Profile />} />
        )}

        <Route path="/employees/:id" element={<EmployeeDetails />} />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;
