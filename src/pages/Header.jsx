import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const {
    user,
    logout,
    isHR,
    isTenant,
    isSuperAdmin,
    isAdmin,
    isEmployeeLevel,
  } = useAuth();

  return (
    <div style={{ borderBottom: "1px solid #ccc", marginBottom: 20 }}>
      <b>{user.fullName}</b> ({user.role}) &nbsp;
      <button onClick={logout}>Logout</button>

      <br /><br />

      <Link to="/">Dashboard</Link>

      {(isHR || isTenant || isAdmin) && (
        <>
          {" | "}
          <Link to="/employees">Employees</Link>
          {" | "}
          <Link to="/employees/create">Create Employee</Link>
        </>
      )}

      {isSuperAdmin && (
        <>
          {" | "}
          <Link to="/super-admin">Super Admin</Link>
        </>
      )}

      {/* Only employee-level roles */}
      {isEmployeeLevel && (
        <>
          {" | "}
          <Link to="/profile">My Profile</Link>
        </>
      )}
    </div>
  );
};

export default Header;