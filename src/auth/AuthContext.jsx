import { createContext, useContext, useEffect, useState } from "react";
import { meApi, logoutApi } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Derived role flags (AUTO update when user changes)
  const isHR = user?.role === "HR";
  const isTenant = user?.role === "TENANT";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isEmployee = user?.role === "EMPLOYEE";

  const loadSession = async () => {
    try {
      const res = await meApi();
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        // expose setters / actions
        setUser,
        reloadSession: loadSession,
        logout,

        // 🔥 expose role helpers
        isHR,
        isTenant,
        isSuperAdmin,
        isEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
