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
import ProtectedRoute from "./components/ProtectedRoute";

import { canManageEmployees, canUseProfileApi } from "./auth/roles";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading session...</div>;

  return (
    <>
      {/* ✅ Show header only if logged in */}
      {user && <Header />}

      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {user && canManageEmployees(user.role) && (
          <>
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees/create"
              element={
                <ProtectedRoute>
                  <CreateEmployee />
                </ProtectedRoute>
              }
            />
          </>
        )}

        {user && user.role === "SUPER_ADMIN" && (
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />
        )}

        {user && canUseProfileApi(user.role) && (
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        )}

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        {/* 🔁 Redirect unknown routes */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;