import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import SuperAdmin from "./pages/SuperAdmin";
import Profile from "./pages/Profile";
import Header from "./components/Header";   // ✅ now exists

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

        {(user.role === "HR" || user.role === "TENANT") && (
          <>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/create" element={<CreateEmployee />} />
          </>
        )}

        {user.role === "SUPER_ADMIN" && (
          <Route path="/super-admin" element={<SuperAdmin />} />
        )}

        {(user.role === "EMPLOYEE" || user.role === "HR") && (
          <Route path="/profile" element={<Profile />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
