import { createContext, useContext, useEffect, useState } from "react";
import { meApi, logoutApi } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Derived role flags (AUTO update when user changes)
const role = user?.role;

const isSuperAdmin = role === "SUPER_ADMIN";
const isTenant = role === "TENANT";
const isAdmin = role === "ADMIN";
const isHR = role === "HR";

// Employee-level roles = everything except SUPER_ADMIN & TENANT
const isEmployeeLevel =
  role && !["SUPER_ADMIN", "TENANT"].includes(role);

const loadSession = async () => {
  try {
    const res = await meApi();
    setUser(res.data.data);
  } catch (err) {
    localStorage.removeItem("token"); // 🔥 auto cleanup
    setUser(null);
  } finally {
    setLoading(false);
  }
};

const logout = async () => {
  try {
    await logoutApi();
  } finally {
    localStorage.removeItem("token"); 
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
        setUser,
        reloadSession: loadSession,
        logout,

        isSuperAdmin,
        isTenant,
        isAdmin,
        isHR,
        isEmployeeLevel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
