import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>

      <p>
        Welcome <b>{user.fullName}</b> ({user.role})
      </p>

      <p>Select an option from the menu above.</p>
    </div>
  );
};

export default Dashboard;
